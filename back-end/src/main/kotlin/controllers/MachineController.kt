package controllers

import persistence.dao.MachineDao
import spark.kotlin.post
import util.Message
import business.factory.MachineFactory
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import spark.Spark.path
import spark.kotlin.get
import javax.servlet.MultipartConfigElement


fun MachineController(machineDao: MachineDao, machineFactory: MachineFactory){
    path("/machines"){
        get("/allMachines") {
            try {
                ObjectMapper().writeValueAsString(machineDao.getAllMachines())
            } catch (e:Exception) {
                println(e.message)
                ObjectMapper().writeValueAsString(Message(""))
            }
        }
        post("/import") {
            try {
                //Retrive the Formdata from the request
                request.attribute("org.eclipse.jetty.multipartConfig", MultipartConfigElement("/temp"))
                request.raw().getPart("file").inputStream.bufferedReader().use {
                    //Skipping first line from the CSV file
                    it.readLine()

                    //Retrieving the filename for the location
                    var location = request.raw().getPart("file").submittedFileName

                    //Trimming the prefix and file extention to get the exact room name
                    location = location.subSequence(6,location.length-4).toString()

                    //Reading the first machine in the file
                    var line: String? = it.readLine()

                    //Map with mac as key and state as value. Represent all machines of a location registered in the DB
                    var macMap: MutableMap<String,Boolean> = machineDao.getLocationMac(location)

                    //Loop each line of the file
                    while(line != null){
                        //Separating each information from the file
                        val machineDetails = line.split(";")

                        //storing mac address for several instances and tirmming the "
                        var trueMac = machineDetails[2].replace("\"","")

                        //if the current mac isn't in the map, the machine is added to the DB
                        if(!macMap.containsKey(trueMac)){
                            val newMachine = machineFactory.getMachine(
                                    ip = machineDetails[0].replace("\"",""),
                                    name = machineDetails[1].replace("\"",""),
                                    mac = trueMac,
                                    comment = machineDetails[3].replace("\"",""),
                                    location = location,
                                    state = true)

                            machineDao.save(newMachine)
                            macMap.remove(trueMac)

                        }else{
                            //If it is already in the DB, enabling it if necessary
                            if(macMap.get(trueMac) === false){
                                machineDao.enableMachine(trueMac)
                            }
                            macMap.remove(trueMac)
                        }
                        line = it.readLine()
                    }
                    //Any mac still in the map means those machines weren't in the file, so they are disabled
                    if(!macMap.isEmpty()){
                        for(mac in macMap.keys){
                            if (macMap.get(mac) === true){
                                machineDao.disableMachine(mac)
                            }
                        }
                    }
                }
            }catch (e:Exception){
                e.printStackTrace()
            }
        }

        post("/manual") {
            try {
                //Retrieving a map with fields as keys and their content as their values
                val map = ObjectMapper().readValue<Map<String, String>>(request.body(),object: TypeReference<Map<String, String>>() {})

                //Making sure the request is properly done
                if(map["name"] == null || map["ip"] == null || map["mac"] == null
                            || map["location"] == null || map["comment"] == null)
                        throw NoFatalException("Requête Incorrecte")

                //New machine created based on the information provided. Enabled by default.
                val newMachine = machineFactory.getMachine(
                        name = map["name"]!!,
                        ip = map["ip"]!!,
                        mac = map["mac"]!!,
                        comment = map["comment"]!!,
                        location = map["location"]!!,
                        state = true)

                //Add the new machine to the DB
                machineDao.save(newMachine)
                ObjectMapper().writeValueAsString(Message("Report correctement enregistré"))
            } catch(e: Exception) {
                e.printStackTrace()
            }

        }


    }

}