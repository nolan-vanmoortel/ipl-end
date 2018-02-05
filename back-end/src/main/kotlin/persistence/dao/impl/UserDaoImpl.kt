package persistence.dao.impl

import business.entities.UserDto
import business.entities.UserReal
import business.factory.UserFactory
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.DalServices
import org.bson.Document
import org.bson.types.ObjectId
import persistence.USERS_COLLECTION
import persistence.dao.UserDao

/**
 * Implementation of UserDao.
 */
class UserDaoImpl(private val dal: DalServices,
                  private val userFactory: UserFactory): UserDao {

    override fun save(user: UserDto): UserReal {
        dal.getCollection(USERS_COLLECTION).insertOne(Document.parse(ObjectMapper().writeValueAsString(user)))
        return getUserByEMail(user.email)
    }

    override fun getUserById(id: String): UserReal {
        val user = dal.getCollection(USERS_COLLECTION).find(Document("_id", ObjectId(id))).first()
                ?: throw NoFatalException("getUserById failed !")
        return userFactory.getUser(user) as UserReal
    }
    override fun getUserByEMail(eMail: String): UserReal {
        val user = dal.getCollection(USERS_COLLECTION).find(Document("email", eMail)).first()
                ?: throw NoFatalException("getUserByEMail failed !")
        return userFactory.getUser(user) as UserReal
    }
}
