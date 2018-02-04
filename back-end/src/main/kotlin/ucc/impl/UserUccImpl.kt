package ucc.impl

import business.entities.UserDto
import exceptions.NoFatalException
import persistence.dao.UserDao
import ucc.UserUcc

/**
 * Implementation of the UserUcc.
 */
class UserUccImpl(private val userDao: UserDao): UserUcc {
    override fun getUserById(id: Int): UserDto {
        return userDao.getUserById(id)
                ?: throw NoFatalException("Pas d'utilisateur pour l'id demandé")
    }
}
