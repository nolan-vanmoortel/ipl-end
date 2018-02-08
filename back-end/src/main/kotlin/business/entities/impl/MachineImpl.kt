package business.entities.impl

import business.entities.MachineReal
import business.entities.ReportReal

/**
 * Implementation of MachineDto and MachineReal.
 */
data class MachineImpl(override val id: String = "",
                       override val ip: String = "",
                       override val mac: String = "",
                       override val name: String = "",
                       override val comment: String = "",
                       override val location: String = "",
                       override val state: Boolean = true,
                       override val reports: List<*> = listOf<ReportReal>()) : MachineReal {

    /**
     * Hello i'm a very complex method.
     */
    override fun complexMethod() {
            println("Je suis la méthode complexe de $ip $mac $name")
    }
}
