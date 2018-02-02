package tests.mocks

import business.entities.UserReal
import tests.util.SetValidator
import java.util.HashSet

class UserMock() : UserReal, SetValidator() {

    override val name: String
        get() = "Doe"
    override val firstName: String
        get() = "John"

    override fun complexMethod() {
        addCurrentMethodToSet()
    }

}