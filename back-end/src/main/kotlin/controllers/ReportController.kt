package controllers

import business.entities.ReportDto
import business.factory.ReportFactory
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.dao.ReportDao
import spark.Spark.path
import spark.kotlin.post
import util.Message
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun ReportController(reportDao: ReportDao, reportFactory: ReportFactory){
    path("/reports") {
        post("/create"){
            try {
                val map = ObjectMapper().readValue<Map<String, String>>(request.body(),object: TypeReference<Map<String, String>>() {})
                if(map["email"] == null || map["modele"] == null || map["severity"] == null
                        || map["type"] == null || map["machine"] == null)
                    throw NoFatalException("Requête Incorrecte")
                val report: ReportDto = reportFactory.getReport(
                        date= LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME),
                        email= map["email"]!!,
                        comment= map["modele"]!!,
                        severity = Integer.parseInt(map["severity"]!!),
                        type = Integer.parseInt(map["type"]!!))
                status(200)
                reportDao.save(map["machine"]!!, report)
                ObjectMapper().writeValueAsString(
                        Message("Report correctement enregistré"))
            } catch(e: Exception) {
                e.printStackTrace()
                status(400)
                ObjectMapper().writeValueAsString(Message(""+e.message))
            }
        }
    }
}
