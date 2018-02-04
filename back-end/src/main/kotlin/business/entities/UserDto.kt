package business.entities

/**
 * UserDto is used to contains the attributes of a user. He does not make any process. Except
 * maybe some check.
 */
interface UserDto {

    val id: String

    val name: String

    val firstname: String

    val email: String

    val salt: String

    val password: String
}
