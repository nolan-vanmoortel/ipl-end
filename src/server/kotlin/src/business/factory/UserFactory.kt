package business.factory

import business.entities.UserDto

/**
 * UserFactory is used to create new Users.
 */
interface UserFactory {

    /**
     * @return a new instance of User as an UserDto.
     * @params used to initiate the fields of the User.
     */
    fun getUser(name: String, firstName: String): UserDto
}