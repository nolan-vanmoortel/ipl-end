package business.factory

import business.entities.ReportReal
import business.entities.MachineDto
import org.bson.Document

/**
 * MachineFactory is used to create new Machines.
 */
interface MachineFactory {

    /**
     * @return a new instance of Machine as an MachineDto.
     * @params used to initiate the fields of the Machine.
     */
    fun getMachine(id:String ="", ip:String ="", mac:String ="", name:String ="", comment: String = "", location: String = "", state: Boolean = false, reports: List<*> = mutableListOf<ReportReal>() ): MachineDto
    fun getMachine(document : Document): MachineDto
}