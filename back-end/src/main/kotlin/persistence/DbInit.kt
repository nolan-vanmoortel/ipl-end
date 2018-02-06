package persistence

import business.entities.impl.UserImpl
import com.mongodb.*
import util.PluginProperties
import org.bson.Document
import java.util.*
import kotlin.collections.ArrayList

/**
 * Used to initialize the data base
 */
fun main(args: Array<String>) {
    val properties = PluginProperties(ClassLoader.getSystemResource("prod.properties").path)
    val mongo = MongoClient(MongoClientURI("mongodb://${properties.getProperty("dbUser")}:${properties.getProperty("dbPassword")}" +
            "@${properties.getProperty("dbUrl")}:${properties.getProperty("dbPort")}/${properties.getProperty("dbName")}"))
    val database = mongo.getDatabase(properties.getProperty("dbName"))
    database.drop()
    database.createCollection(MACHINES_COLLECTION)
    val collection = database.getCollection(MACHINES_COLLECTION)
    val machine1 = Document("ip", "165.17.54.21")
            .append("mac", "yolo:fd01")
            .append("name", "machine1")
            .append("comment", "a machine to yolo")
            .append("location", "017")
            .append("reports", ArrayList<Any>())
            .append("state", false)
    collection.insertOne(machine1)
}
