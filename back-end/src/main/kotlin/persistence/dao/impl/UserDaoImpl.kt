package persistence.dao.impl

import business.entities.UserDto
import business.entities.UserReal
import business.factory.UserFactory
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.DalServices
import org.bson.Document
import org.bson.types.ObjectId
import persistence.dao.UserDao
import util.PluginProperties

/**
 * Implementation of UserDao.
 */
class UserDaoImpl(private val dal: DalServices,
                  private val userFactory: UserFactory,
                  private val properties: PluginProperties): UserDao {
    override fun getAllUsers(): ArrayList<UserDto> {
        return dal.getCollection(properties.getProperty("USERS_COLLECTION"))
                .find().mapTo(ArrayList<UserDto>()) { userFactory.getUser(it) as UserReal }
    }

    override fun save(user: UserDto): UserReal {
        dal.getCollection(properties.getProperty("USERS_COLLECTION"))
                .insertOne(Document("email", user.email)
                        .append("salt", user.salt)
                        .append("password", user.password))
        return getUserByEMail(user.email)
    }

    override fun getUserById(id: String): UserReal {
        val user = dal.getCollection(properties.getProperty("USERS_COLLECTION"))
                .find(Document("_id", ObjectId(id))).first()
                ?: throw NoFatalException("getUserById failed !")
        return userFactory.getUser(user) as UserReal
    }
    override fun getUserByEMail(email: String): UserReal {
        val user = dal.getCollection(properties.getProperty("USERS_COLLECTION"))
                .find(Document("email", email)).first()
                ?: throw NoFatalException("getUserByEMail failed !")
        return userFactory.getUser(user) as UserReal
    }
}
