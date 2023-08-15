import neo4j from 'neo4j-driver'
import type { Driver } from 'neo4j-driver'

let driver: Driver

const defaultOptions = {
  uri: "bolt://2f1824e7.databases.neo4j.io:7687",
  username: "neo4j",
  password: "z4Tv1T9CDedjPTe9ueiZmjVJQK63yxCl2uGWYanAPkA",
}

export default function getDriver() {
  const { uri, username, password } = defaultOptions
  if (!driver) {
    driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
  }

  return driver
}
