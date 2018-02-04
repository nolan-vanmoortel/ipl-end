package business.factory.impl

import business.entities.UserDto
import business.factory.UserFactory
import business.entities.impl.UserImpl
import exceptions.NoFatalException
import org.bson.Document
import org.bson.types.ObjectId

/**
 * Object implementation of the UserFactory.
 */
class UserFactoryImpl: UserFactory {
    override fun getUser(document: Document): UserDto {
        return getUser((document.get("_id") as ObjectId).toHexString(), document.getString("name"), document.getString("firstname"), document.getString("email"), document.getString("salt"), document.getString("password"))
    }

    override fun getUser(id: String, name: String, firstname: String, email: String, salt: String, password: String): UserDto {
        return UserImpl(id, name, firstname, email,salt,password)
    }
}
