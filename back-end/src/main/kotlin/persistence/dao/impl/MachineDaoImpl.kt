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

    override fun getMachineByMac(mac: String): MachineReal {
        val machine = dal.getCollection(MACHINES_COLLECTION).find(Document("mac", mac)).first()
                ?: throw NoFatalException("getMachineByMac failed !")
        return machineFactory.getMachine(machine) as MachineReal
    }
}
