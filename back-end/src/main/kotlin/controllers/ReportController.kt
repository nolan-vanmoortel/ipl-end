package controllers

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

fun ReportController(reportDao: ReportDao, reportFactory: ReportFactory){

}
