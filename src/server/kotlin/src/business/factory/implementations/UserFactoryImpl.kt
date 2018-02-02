package business.factory.implementations

import business.entities.UserDto
import business.factory.UserFactory
import business.entities.implementations.UserImpl

/**
 * Object implementation of the UserFactory.
 */
class UserFactoryImpl: UserFactory {
    override fun getUser(name: String, firstName: String): UserDto {
        return UserImpl(name, firstName)
    }
}