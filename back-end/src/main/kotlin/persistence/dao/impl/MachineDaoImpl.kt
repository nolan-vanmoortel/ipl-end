package persistence.dao.impl

import business.entities.MachineDto
import business.entities.MachineReal
import business.factory.MachineFactory
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.DalServices
import org.bson.Document
import org.bson.types.ObjectId
import persistence.MACHINES_COLLECTION
import persistence.dao.MachineDao
import com.mongodb.client.model.Filters.eq

/**
 * Implementation of MachineDao.
 */
class MachineDaoImpl(private val dal: DalServices,
                     private val machineFactory: MachineFactory): MachineDao {

    override fun save(machine: MachineDto): MachineReal {
        dal.getCollection(MACHINES_COLLECTION).insertOne(Document.parse(ObjectMapper().writeValueAsString(machine)))
        return getMachineByMac(machine.mac)
    }

    override fun getMachineById(id: String): MachineReal {
        val machine = dal.getCollection(MACHINES_COLLECTION).find(Document("_id", ObjectId(id))).first()
                ?: throw NoFatalException("getMachineById failed !")
        return machineFactory.getMachine(machine) as MachineReal
    }

    override fun getAllMachines(): ArrayList<MachineDto> {
        val machinesList = arrayListOf<MachineDto>()
        val machinesMongo = dal.getCollection(MACHINES_COLLECTION).find()

        for (document in machinesMongo){
            val machine = machineFactory.getMachine(document) as MachineReal
            machinesList.add(machine)
        }

        return machinesList
    }

    override fun getLocationMachines(location: String): ArrayList<MachineDto> {
        val machinesList = arrayListOf<MachineDto>()
        val machinesMongo = dal.getCollection(MACHINES_COLLECTION).find(Document("location",location))

        for (document in machinesMongo){
            val machine = machineFactory.getMachine(document) as MachineReal
            machinesList.add(machine)
        }

        return machinesList
    }

    override fun getMachineByMac(mac: String): MachineReal {
        val machine = dal.getCollection(MACHINES_COLLECTION).find(Document("mac", mac)).first()
                ?: throw NoFatalException("getMachineByMac failed !")
        return machineFactory.getMachine(machine) as MachineReal
    }

    override fun getLocationMac(location: String): MutableMap<String,Boolean>{
        val machinesList = getLocationMachines(location)
        var macMap = mutableMapOf<String,Boolean>()
        for (machine in machinesList){
            macMap.put(machine.mac,machine.state)
        }
        return macMap
    }

    override fun enableMachine(mac: String){
        dal.getCollection(MACHINES_COLLECTION)
                .updateOne(eq("mac", mac),
                        Document("\$set", Document("state", true)))
    }

    override fun disableMachine(mac: String){
        dal.getCollection(MACHINES_COLLECTION)
                .updateOne(eq("mac", mac),
                        Document("\$set", Document("state", false)))
    }
}
