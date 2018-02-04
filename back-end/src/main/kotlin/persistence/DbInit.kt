package persistence

import business.entities.impl.UserImpl
import com.mongodb.*
import util.PluginProperties
import org.bson.Document
import java.util.*

/**
 * Used to initialize the data base
 */
fun main(args: Array<String>) {
    val properties = PluginProperties(ClassLoader.getSystemResource("prod.properties").path)
    val mongo = MongoClient(MongoClientURI("mongodb://${properties.getProperty("dbUser")}:${properties.getProperty("dbPassword")}" +
            "@${properties.getProperty("dbUrl")}:${properties.getProperty("dbPort")}/${properties.getProperty("dbName")}"))
    val database = mongo.getDatabase(properties.getProperty("dbName"))
    database.drop()
    database.createCollection("Utilisateurs")
    val collection = database.getCollection("Utilisateurs")
    val document = Document("title", "MongoDb")
            .append("id", 1)
            .append("name", "Doe")
            .append("first_name", "John")
    collection.insertOne(document)
}
