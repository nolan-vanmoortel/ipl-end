package persistence.dao

import business.entities.MachineDto
import business.entities.MachineReal

/**
 * MachineDao will make the logic about the Machines Table.
 */
interface MachineDao {

    /**
     * @param id of the machine inside the db.
     * @return a machine if the id represent a machine and null otherwise.
     */
    fun getMachineById(id: String): MachineReal
    fun getMachineByMac(mac: String): MachineReal
    fun getAllMachines(): ArrayList<MachineDto>
    fun getLocationMachines(location:String): ArrayList<MachineDto>
    fun getLocationMac(location: String): MutableMap<String,Boolean>
    fun enableMachine(mac: String)
    fun disableMachine(mac: String)
    fun save(machine: MachineDto): MachineReal
}
