package business.factory

import business.entities.UserDto
import org.bson.Document

/**
 * UserFactory is used to create new Users.
 */
interface UserFactory {

    /**
     * @return a new instance of User as an UserDto.
     * @params used to initiate the fields of the User.
     */
    fun getUser(id:String ="", name: String = "", firstname: String = "", email: String = "", salt: String = "", password: String =""): UserDto
    fun getUser(document : Document): UserDto
}
