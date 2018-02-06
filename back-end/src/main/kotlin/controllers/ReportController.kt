package controllers

import business.entities.DEFAULT_TYPE
import business.entities.MINOR_SEVERITY
import business.entities.ReportDto
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.dao.ReportDao
import spark.Spark.path
import spark.kotlin.get
import spark.kotlin.post
import util.Message
import business.factory.ReportFactory
import spark.Request
import util.*
import java.time.LocalDateTime

fun ReportController(reportDao: ReportDao, reportFactory: ReportFactory){
    path("/reports") {
        post("/create"){
            try {
                val report: ReportDto = reportFactory.getReport(date= LocalDateTime.now(),
                        email=request.qp("email"), comment=request.qp("modele"),
                        severity = Integer.parseInt(request.qp("severity")),
                        type = Integer.parseInt(request.qp("type")))
                status(200)
                ObjectMapper().writeValueAsString(Message(reportDao.save(request.qp("machine"), report).id))
            } catch(e: Exception) {
                e.printStackTrace()
                status(400)
                ObjectMapper().writeValueAsString(Message(""+e.message))
            }
        }
    }
}
