import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  despesasChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [dependentes, setDependentes] = useState();
  const [objetivos, setObjetivos] = useState();
  const [despesasMes, setDespesasMes] = useState();
  const dependentesColumns = ["Nome", "Parentesco", "Renda"]
  const objetivosColumns = ["Nome", "Quantidade de Investimentos", "Valor Total"]

  const buscarDependentes = () => {
    fetch('http://localhost:8080/usuarios/1/dependentes', {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)

        //isso daqui vai ser importante e está quase pronto pra o que vcs vão precisar
        var result = json.map(function (obj) {
          var posArr = []
          posArr.push(obj.nome)
          posArr.push(obj.parentesco)
          posArr.push(obj.renda)
          return posArr;
        });

        setDependentes(result)
      })
      .catch(err => {
        console.log("Erro")
        console.log(err)
      })
  }

  const buscarDespesasMes = () => {
    fetch('http://localhost:8080/usuarios/1/despesas/mes-corrente', {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)

        var somaMensal = 0;

        json.forEach(function (item, index) {
          somaMensal += item.valor
        })

        setDespesasMes(somaMensal)
      })
      .catch(err => {
        console.log("Erro")
        console.log(err)
      })
  }

  const buscarObjetivos = () => {
    fetch('http://localhost:8080/usuarios/1/objetivos', {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)

        //isso daqui vai ser importante e está quase pronto pra o que vcs vão precisar
        var result = json.map(function (obj) {
          var posArr = []
          posArr.push(obj.nome)
          posArr.push(obj.numeroInvestimentos)
          posArr.push(obj.valorTotal)
          return posArr;
        });

        setObjetivos(result)
      })
      .catch(err => {
        console.log("Erro")
        console.log(err)
      })
  }

  useEffect(() => {

    //não esqueçam disso
    buscarObjetivos();
    buscarDependentes();
    buscarDespesasMes();

  }, []);




  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Dependentes</h4>
              <p className={classes.cardCategoryWhite}>
                Lista dos seus dependentes
              </p>
            </CardHeader>
            <CardBody>
              {dependentes !== undefined &&
                <Table
                  tableHeaderColor="primary"
                  tableHead={dependentesColumns}
                  tableData={dependentes && dependentes}
                />
              }

            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Objetivos</h4>
              <p className={classes.cardCategoryWhite}>
                Lista dos seus objetivos
              </p>
            </CardHeader>
            <CardBody>
              {objetivos !== undefined &&
                <Table
                  tableHeaderColor="primary"
                  tableHead={objetivosColumns}
                  tableData={objetivos && objetivos}
                />
              }

            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={despesasChart.data}
                type="Bar"
                options={despesasChart.options}
                listener={despesasChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Despesas por Mês</h4>
              {/* <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p> */}
            </CardBody>
            {/* <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Despesas deste Mês</p>
              <h3 className={classes.cardTitle}>{despesasMes && despesasMes}</h3>
            </CardHeader>
            {/* <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter> */}
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
