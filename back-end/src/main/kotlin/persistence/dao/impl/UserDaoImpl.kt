package persistence.dao.impl

import business.entities.UserReal
import business.factory.UserFactory
import persistence.DalServices
import org.bson.Document
import persistence.USERS_COLLECTION
import persistence.dao.UserDao

/**
 * Implementation of UserDao.
 */
class UserDaoImpl(private val dal: DalServices,
                  private val userFactory: UserFactory): UserDao {

    override fun getUserById(id: Int): UserReal? {
        val user = dal.getCollection(USERS_COLLECTION).find(Document("id", id)).first()
                ?: return null
        return userFactory.getUser(user.getString("name"), user.getString("first_name")) as UserReal
    }
}
