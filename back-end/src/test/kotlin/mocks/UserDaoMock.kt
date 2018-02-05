package tests.mocks

import business.entities.UserDto
import business.entities.UserReal
import persistence.dao.UserDao
import tests.util.SetValidator

class UserDaoMock() : SetValidator(), UserDao {
    override fun getUserById(id: String): UserReal {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getUserByEMail(email: String): UserReal {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun save(user: UserDto): UserReal {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}
