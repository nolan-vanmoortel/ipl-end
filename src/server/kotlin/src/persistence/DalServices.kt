package persistence

import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import org.bson.Document

interface DalServices {

   fun getCollection(string: String): MongoCollection<Document>
}