package util

import java.io.File
import java.util.*

class PluginProperties(file: String) {

    private val props: Properties = Properties()

    init {
        Util.checkString(file)
        File(file).inputStream().use {
            props.load(it)
        }
    }

    /**
     * @params the property key.
     * @return the string associated to the property key.
     */
    fun getProperty(property: String): String {
        return props.getProperty(property)
    }
}

