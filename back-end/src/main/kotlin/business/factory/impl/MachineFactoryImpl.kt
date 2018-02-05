package business.factory.impl

import business.entities.MachineDto
import business.factory.MachineFactory
import business.entities.impl.MachineImpl
import org.bson.Document
import org.bson.types.ObjectId

/**
 * Object implementation of the MachineFactory.
 */
class MachineFactoryImpl : MachineFactory {
    override fun getMachine(document: Document): MachineDto {
        return getMachine((document.get("_id") as ObjectId).toHexString(), document.getString("ip"), document.getString("mac"), document.getString("name"), document.getString("comment"), document.getString("location"), document.getBoolean("state"), document.get("reports") as List<*> )
    }

    override fun getMachine(id:String, ip:String, mac:String, name:String, comment: String, location: String, state: Boolean, reports: List<*>): MachineDto {
        return MachineImpl(id, ip, mac, name, comment, location, state, reports)
    }
}
