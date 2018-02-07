package controllers

import persistence.dao.MachineDao
import spark.kotlin.post
import util.Message
import business.factory.MachineFactory
import com.fasterxml.jackson.databind.ObjectMapper
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

                request.attribute("org.eclipse.jetty.multipartConfig", MultipartConfigElement("/temp"))
                request.raw().getPart("file").inputStream.bufferedReader().use {
                    //Skipping first line from the CSV file
                    it.readLine()
                    println("data value: ")
                    val location = request.raw().getPart("data").toString()
                            //request.params("data")
                    var line: String? = it.readLine()

                    //Map with mac as key and state as value. Represent all machines of a location
                    var macMap: MutableMap<String,Boolean> = machineDao.getLocationMac(location)

                    //Loop each line of the file
                    while(line != null){
                        //Separating each information from the file
                        val machineDetails = line.split(";")
                        //Removing extra "
                        var trueMac = machineDetails[2].replace("\"","")

                        //if the current mac isn't in the map, the machine is added to the DB
                        if(!macMap.containsKey(trueMac)){
                            val newMachine = machineFactory.getMachine(
                                    ip = machineDetails[0],
                                    name = machineDetails[1],
                                    mac = trueMac,
                                    comment = machineDetails[3],
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
                println(e.message)
            }
        }
    }

}