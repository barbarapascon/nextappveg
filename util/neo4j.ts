import { Driver, Session } from 'neo4j-driver';
import aql from 'neo4j-driver'
const NEO4J_URI = process.env.NEO4J_URI || 'bolt://2f1824e7.databases.neo4j.io:7687';
const NEO4J_USER = process.env.NEO4J_USER || 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'z4Tv1T9CDedjPTe9ueiZmjVJQK63yxCl2uGWYanAPkA';

let _driver: Driver;

export function getDriver(): Driver {
  if (!_driver) {
    _driver = aql.driver(NEO4J_URI, aql.auth.basic(NEO4J_USER, NEO4J_PASSWORD));
  }
  return _driver;
}

export function getSession(): Session {
  return getDriver().session();
}

export const driver = getDriver();

export function closeDriver() {
  if (_driver) {
    _driver.close();
    _driver = null;
  }
}
