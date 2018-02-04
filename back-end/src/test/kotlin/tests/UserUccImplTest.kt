package tests.tests

import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import tests.mocks.UserDaoMock
import tests.util.SetValidator
import ucc.UserUcc
import ucc.impl.UserUccImpl

object UserUccImplTest {

    private val mockDao: SetValidator
    private val userUcc: UserUcc

    init {
        mockDao = UserDaoMock()
        mockDao.addMethodToExpect("getUserById")
        userUcc = UserUccImpl(mockDao)
    }

    @Test
    fun testGetUserById1() {
        userUcc.getUserById(1)
        assertTrue(mockDao.validate(), "getUserById should have been called on dao")
    }
}
