package business.entities

/**
 * MachineDto is used to contains the attributes of a machine. It does not make any process. Except
 * maybe some check.
 */
interface MachineDto {

    val id: String

    val ip: String

    val mac: String

    val name: String

    val comment: String

    val location: String

    val state: Boolean

    val reports: List<*>

}
