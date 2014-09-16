name := "ims"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,
  "org.apache.commons" % "commons-email" % "1.3",
  "org.mindrot" % "jbcrypt" % "0.3m"
)     

play.Project.playJavaSettings
