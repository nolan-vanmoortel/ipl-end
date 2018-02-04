package tests.mocks

import business.entities.UserReal
import tests.util.SetValidator


class UserMock() : UserReal, SetValidator() {

    override val name: String
        get() = "Doe"
    override val firstname: String
        get() = "John"

    override fun complexMethod() {
        addCurrentMethodToSet()
    }

}
