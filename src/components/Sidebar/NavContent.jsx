import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./Social";
import externalUrls from "./externalUrls";
import { ReactComponent as StakeIcon } from "../../assets/icons/icon_deposit.svg";
import { ReactComponent as BondIcon } from "../../assets/icons/icon_bond.svg"; 
import { ReactComponent as PancakeIcon } from "../../assets/icons/icon_pancake.svg";
import { ReactComponent as UniswapIcon } from "../../assets/icons/icon_uniswap.svg";
import { ReactComponent as DocumentsIcon } from "../../assets/icons/icon_documents.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/icon_dashboard.svg";  
import { ReactComponent as ChartsIcon } from "../../assets/icons/icon_charts.svg";  
import { ReactComponent as CalculatorIcon } from "../../assets/icons/icon_calculator.svg";
import { ReactComponent as HectorIcon } from "../../assets/icons/hector-nav-header.svg";
import { ReactComponent as PoolTogetherIcon } from "../../assets/icons/33-together.svg";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./sidebar.scss";
import { addresses } from "src/constants";



function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const { bonds } = useBonds();
  const { chainID } = useWeb3Context();
  const DAIAddress = addresses[chainID].DAI_ADDRESS;
  const HALAddress = addresses[chainID].HEC_ADDRESS;
  
  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="/" target="_blank">
              <SvgIcon
                color="primary"
                component={HectorIcon}
                viewBox="0 0 1024 1024"
                style={{ minWdth: "200px", minHeight: "200px", width: "200px" }}
              />
              <div className="wallet-link f-48">&nbsp;&nbsp;HALCYON&nbsp;&nbsp;</div>
            </Link>
            {address && (
              <div className="wallet-link">
                <Link href={`https://etherscan.io/address/${address}`} target="_blank">
                  {shorten(address)}
                </Link>
              </div>
            )}
          </Box>
          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="dash-nav"
                to="/dashboard"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" viewBox="0 0 256 256" component={DashboardIcon} />
                  Construct Dashboard
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="bond-nav"
                to="/bonds"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" viewBox="0 0 256 256" component={BondIcon} />
                  Get HAL with Discount (Bond)
                </Typography>
              </Link>

              <div className="dapp-menu-data discounts">
                <div className="bond-discounts">
                  <Typography variant="body2">Bond discounts</Typography>
                  {bonds.map((bond, i) => (
                    <Link component={NavLink} to={`/bonds/${bond.name}`} key={i} className={"bond"}>
                      {!bond.bondDiscount ? (
                        <Skeleton variant="text" width={"150px"} />
                      ) : (
                        <Typography variant="body2">
                          {bond.displayName}
                          <span className="bond-pair-roi">
                            {bond.isSoldOut ? (
                              "Sold Out"
                            ) : (
                              <>{bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%</>
                            )}
                          </span>
                        </Typography>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href={`https://app.uniswap.org/#/swap?inputCurrency=${DAIAddress}&outputCurrency=${HALAddress}`} target="_blank" component={"a"}>
                <Typography variant="h6">
                  <SvgIcon color="primary" viewBox="0 0 256 256" component={UniswapIcon} />
                  Get HAL without Discount (Uniswap)
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="stake-nav"
                to="/"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" viewBox="0 0 256 256" component={StakeIcon} />
                  Deposit HAL to Earn Interest (Stake)
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="bond-nav"
                to="/calculator"
                isActive={(match, location) => {
                  return checkPage(match, location, "calculator");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" viewBox="-50 -50 350 350" component={CalculatorIcon} />
                  Ask The Oracle
                </Typography>
              </Link>

              <Link href={""} target="_blank" component={"a"}>
                <Typography variant="h6">
                  <SvgIcon color="primary" viewBox="0 0 256 256" component={DocumentsIcon} />
                  Documents
                </Typography>
              </Link>

              <Link href={"https://dexscreener.com/ethereum/0x7e1d039e579fda96101df972abe475d47bade764"} target="_blank" component={"a"}>
                <Typography variant="h6">
                  <SvgIcon color="primary" viewBox="0 0 256 256" component={ChartsIcon} />
                  Charts
                </Typography>
              </Link>

              
            </div>
          </div>
          <div className="f-20">
          </div>
          <Social />
          
        </div>

        {/* <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-external-links">
            {externalUrls.map(({ url, icon, title, label }, i) => {
              return (
                <Link key={i} href={url} target="_blank" component={url ? "a" : "span"}>
                  <Typography variant="h6">{icon}</Typography>
                  <Typography variant="h6">{title}</Typography>
                  {label ? (
                    <Typography variant="caption" style={{ marginLeft: "8px" }}>
                      {label}
                    </Typography>
                  ) : null}
                </Link>
              );
            })}
          </div>
          
        </Box> */}
      </Box>
    </Paper>
  );
}

export default NavContent;
