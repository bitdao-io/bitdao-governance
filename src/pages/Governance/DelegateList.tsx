import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import useStyles from "./Governance.styles";
import handleNumberFormat from "../../helpers/handleNumberFormat";

type DelegateListProps = {
    delegates: any;
}

function DelegateList({ delegates }: DelegateListProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      {/* sx={{ minWidth: 650 }} */}
      <Table aria-label="simple table" style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.headtabelCell} align="center">
                Rank
            </TableCell>
            <TableCell className={classes.headtabelCell} align="center">
                Votes
            </TableCell>
            {/* <TableCell className={classes.headtabelCell} align="right">
                Vote Weight
                </TableCell> */}
            {/* <TableCell className={classes.headtabelCell} align="right">
                Proposals Voted
                </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* sx={{ "&:last-child td, &:last-child th": { border: 0 } }} */}
          {delegates.map((row: any, index: any) => (
          <TableRow key={index}>
            <TableCell
            component="th"
            scope="row"
            className={classes.tabelCell}
            align="center"
            >
              <a
                href={`${process.env.REACT_APP_ETHERSCAN_ADDRESS}${row.id}`}
                target="_blank"
              >
                {index + 1}&nbsp;
                <span className={classes.separator}>|</span> &nbsp;
                {row.id.slice(0, 5) + "..." + row.id.slice(-5)}
              </a>
            </TableCell>
            <TableCell className={classes.tabelCell} align="center">
              {Number.isInteger(
                  Number(
                  handleNumberFormat(row.delegatedVotes).replace(
                      /,/g,
                      ""
                  )
                  )
              )
                  ? handleNumberFormat(row.delegatedVotes)
                  : handleNumberFormat(
                      Number(
                      handleNumberFormat(row.delegatedVotes).replace(
                          /,/g,
                          ""
                      )
                      ).toFixed(2)
                  )}
            </TableCell>
              {/* <TableCell className={classes.tabelCell} align="right">
                  {console.log("total votes", totalVotes)}
                  {((row.vote / totalVotes) * 100).toFixed(2)}%
                  </TableCell> */}
              {/* <TableCell className={classes.tabelCell} align="right" style={{boxShadow: "inset -1px 0px 2px #ECECEC",}}>
                  {row.vote.toFixed(2)}
                  </TableCell> */}
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DelegateList;

