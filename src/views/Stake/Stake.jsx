import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  Typography,
  Zoom,
} from "@material-ui/core";
import NewReleases from "@material-ui/icons/NewReleases";
import RebaseTimer from "../../components/RebaseTimer/RebaseTimer";
import TabPanel from "../../components/TabPanel";
import { getOhmTokenImage, getTokenImage, trim } from "../../helpers";
import { changeApproval, changeStake, changeForfeit, changeClaim } from "../../slices/StakeThunk";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./stake.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { Skeleton } from "@material-ui/lab";
import ExternalStakePool from "./ExternalStakePool";
import { error } from "../../slices/MessagesSlice";
import { ethers, BigNumber } from "ethers";
import WarmUp from "../../components/warm-up/warm-up";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const sOhmImg = getTokenImage("sohm");
const ohmImg = getOhmTokenImage(16, 16);

function Stake() {
  const dispatch = useDispatch();
  const { provider, address, connected, connect, chainID } = useWeb3Context();

  const [zoomed, setZoomed] = useState(false);
  const [view, setView] = useState(0);
  const view1 = 0;
  const [quantity, setQuantity] = useState("");
  const [oldquantity, setOldQuantity] = useState("");

  const isAppLoading = useSelector(state => state.app.loading);
  const currentIndex = useSelector(state => {
    return state.app.currentIndex;
  });
  const fiveDayRate = useSelector(state => {
    return state.app.fiveDayRate;
  });
  const oldfiveDayRate = useSelector(state => {
    return state.app.old_fiveDayRate;
  });
  const ohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.ohm;
  });
  const oldSohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.oldsohm;
  });
  const shecBalance = useSelector(state => {
    return state.account.balances && state.account.balances.sohm;
  });
  const oldshecBalance = useSelector(state => {
    return state.account.balances && state.account.balances.oldshec;
  });
  const wsohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.wsohm;
  });
  const stakeAllowance = useSelector(state => {
    return state.account.staking && state.account.staking.ohmStake;
  });
  const unstakeAllowance = useSelector(state => {
    return state.account.staking && state.account.staking.ohmUnstake;
  });
  const oldunstakeAllowance = useSelector(state => {
    return state.account.staking && state.account.staking.oldhecUnstake;
  });
  const stakingRebase = useSelector(state => {
    return state.app.stakingRebase;
  });
  const oldstakingRebase = useSelector(state => {
    return state.app.old_stakingRebase;
  });
  const stakingAPY = useSelector(state => {
    return state.app.stakingAPY;
  });
  const stakingTVL = useSelector(state => {
    return state.app.stakingTVL;
  });

  const currentEpochNumber = useSelector(state => {
    return state.app.epochNumber;
  });

  const pendingTransactions = useSelector(state => {
    return state.pendingTransactions;
  });

  const warmUpAmount = useSelector(state =>{
    return state.account.warmup && state.account.warmup.warmupAmount;
  });


  const depositAmount = useSelector(state => {
    return state.account.warmup && state.account.warmup.depositAmount;  
  });
 

  
  const expiry = useSelector(state =>{
    return state.account.warmup && state.account.warmup.expiryBlock;
  });

  const onFofeit = async() => {
    await dispatch(changeForfeit({ address, provider, networkID: chainID }));
  };

  const onClaim = async() => {
    await dispatch(changeClaim({ address, provider, networkID: chainID }));
  }
  const warmupRebaseTime = expiry - currentEpochNumber;
  
  const trimmedWarmUpAmount = Number(
    [warmUpAmount]
        .filter(Boolean)
        .map(amount => Number(amount))
        .reduce((a, b) => a + b, 0)
        .toFixed(4),
  );

  const setMax = () => {
    if (view === 0) {
      setQuantity(ohmBalance);
    } else {
      setQuantity(shecBalance);
    }
  };
  const setOldMax = () => {
    setOldQuantity(oldshecBalance);
  };

  const onSeekApproval = async token => {
    await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
  };

  const onChangeStake = async (action, isOld) => {
    // eslint-disable-next-line no-restricted-globals
    let value, unstakedVal;
    if (isOld) {
      value = oldquantity;
      unstakedVal = oldshecBalance;
    } else {
      value = quantity;
      unstakedVal = shecBalance;
    }
    if (isNaN(value) || value === 0 || value === "") {
      // eslint-disable-next-line no-alert
      return dispatch(error("Please enter a value!"));
    }

    // 1st catch if quantity > balance
    let gweiValue = ethers.utils.parseUnits(value, "gwei");
    if (action === "stake" && gweiValue.gt(ethers.utils.parseUnits(ohmBalance, "gwei"))) {
      return dispatch(error("You cannot stake more than your HAL balance."));
    }

    if (action === "unstake" && gweiValue.gt(ethers.utils.parseUnits(unstakedVal, "gwei"))) {
      return dispatch(error("You cannot unstake more than your sHAL balance."));
    }
    await dispatch(
      changeStake({
        address,
        action,
        value: value.toString(),
        provider,
        networkID: chainID,
        callback: () => (isOld ? setOldQuantity("") : setQuantity("")),
        isOld: isOld,
      }),
    );
  };

  const hasAllowance = useCallback(
    token => {
      if (token === "ohm") return stakeAllowance > 0;
      if (token === "sohm") return unstakeAllowance > 0;
      if (token === "oldshec") return oldunstakeAllowance > 0;
      return 0;
    },
    [stakeAllowance, unstakeAllowance],
  );

  const isAllowanceDataLoading = (stakeAllowance == null && view === 0) || (unstakeAllowance == null && view === 1);

  let modalButton = [];

  modalButton.push(
    <Button variant="contained" color="primary" className="connect-button" onClick={connect} key={1}>
      Connect Wallet
    </Button>,
  );

  const changeView = (event, newView) => {
    setView(newView);
  };

  const trimmedBalance = Number(
    [shecBalance, wsohmBalance]
      .filter(Boolean)
      .map(balance => Number(balance))
      .reduce((a, b) => a + b, 0)
      .toFixed(4),
  );
  const oldtrimmedBalance = Number(
    [oldshecBalance, wsohmBalance]
      .filter(Boolean)
      .map(balance => Number(balance))
      .reduce((a, b) => a + b, 0)
      .toFixed(4),
  );
  
  const trimmedStakingAPY =
  stakingAPY > 100000000 ? parseFloat(stakingAPY * 100 ) : trim(stakingAPY * 100, 3);
  const stakingRebasePercentage = trim(stakingRebase * 100, 4);
  const oldstakingRebasePercentage = trim(oldstakingRebase * 100, 4);
  const nextRewardValue = trim((stakingRebasePercentage / 100) * trimmedBalance, 4);
  const oldnextRewardValue = trim((oldstakingRebasePercentage / 100) * oldtrimmedBalance, 4);
  const trimmedStakingTVL = trim(stakingTVL, 3);
  return (
    <>
      <div class="stake">
       {trimmedWarmUpAmount > 0 && (
          <WarmUp
            depositAmount={depositAmount}
            trimmedWarmUpAmount={trimmedWarmUpAmount}
            warmupRebaseTime={warmupRebaseTime}
            pendingTransactions={pendingTransactions}
            onClaim={onClaim}
            onFofeit={onFofeit}
          />
        )}
        <div id="stake-view" >
          <Zoom in={true} onEntered={() => setZoomed(true)}>
            <Paper className={`ohm-card`} >
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <div className="card-header">
                    <Typography variant="h5">HAL Deposit - After 24 Hours (Stake)</Typography>
                    <RebaseTimer />
                  </div>
                </Grid>

                <Grid item>
                  <div className="stake-top-metrics">
                    <Grid container spacing={2} alignItems="flex-start">
                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        <div className="stake-apy">
                          <Typography variant="h5" color="textSecondary">
                            APY
                          </Typography>
                          <Typography variant="h4" style={{"word-break":"break-all", "white-space":"break-spaces"}}>
                            {stakingAPY ? (
                              // <>{new Intl.NumberFormat("en-US", { notation: "scientific" }).format(stakingAPY)}%</>
                              <>{new Intl.NumberFormat("en-US").format(trimmedStakingAPY)}%</>
                            ) : (
                              <Skeleton width="150px" />
                            )}
                          </Typography>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        <div className="stake-tvl">
                          <Typography variant="h5" color="textSecondary">
                            Total Value Deposited
                          </Typography>
                          <Typography variant="h4">
                            {stakingTVL ? (
                              new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                                minimumFractionDigits: 0,
                              }).format(stakingTVL)
                            ) : (
                              <Skeleton width="150px" />
                            )}
                          </Typography>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        <div className="stake-index">
                          <Typography variant="h5" color="textSecondary">
                            Current Index
                          </Typography>
                          <Typography variant="h4">
                            {currentIndex ? <>{trim(currentIndex, 1)} HAL</> : <Skeleton width="150px" />}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <div className="staking-area">
                  {!address ? (
                    <div className="stake-wallet-notification">
                      <div className="wallet-menu" id="wallet-menu">
                        {modalButton}
                      </div>
                      <Typography variant="h6">Connect your wallet to stake HAL</Typography>
                    </div>
                  ) : (
                    <>
                      <Box className="stake-action-area">
                        <Tabs
                          key={String(zoomed)}
                          centered
                          value={view}
                          textColor="primary"
                          indicatorColor="primary"
                          className="stake-tab-buttons"
                          onChange={changeView}
                          aria-label="stake tabs"
                        >
                          <Tab label="Deposit" {...a11yProps(0)} />
                          <Tab label="Withdraw" {...a11yProps(1)} />
                        </Tabs>

                        <Box className="stake-action-row " display="flex" alignItems="center">
                          {address && !isAllowanceDataLoading ? (
                            (!hasAllowance("ohm") && view === 0) || (!hasAllowance("sohm") && view === 1) ? (
                              <Box className="help-text">
                                <Typography variant="body1" className="stake-note" color="textSecondary">
                                  {view === 0 ? (
                                    <>
                                      First time staking <b>HAL</b>?
                                      <br />
                                      Please approve TheRedPill DAO to use your <b>HAL</b> for staking.
                                    </>
                                  ) : (
                                    <>
                                      First time unstaking <b>sHAL</b>?
                                      <br />
                                      Please approve TheRedPill DAO to use your <b>sHAL</b> for unstaking.
                                    </>
                                  )}
                                </Typography>
                              </Box>
                            ) : (
                              <FormControl className="ohm-input" variant="outlined" color="primary">
                                <InputLabel htmlFor="amount-input"></InputLabel>
                                <OutlinedInput
                                  id="amount-input"
                                  type="number"
                                  placeholder="Enter an amount"
                                  className="stake-input"
                                  value={quantity}
                                  onChange={e => setQuantity(e.target.value)}
                                  labelWidth={0}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <Button variant="text" onClick={setMax} color="inherit">
                                        Max
                                      </Button>
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                            )
                          ) : (
                            <Skeleton width="150px" />
                          )}

                          <TabPanel value={view} index={0} className="stake-tab-panel">
                            {isAllowanceDataLoading ? (
                              <Skeleton />
                            ) : address && hasAllowance("ohm") ? (
                              <Button
                                className="stake-button"
                                variant="contained"
                                color="primary"
                                disabled={isPendingTxn(pendingTransactions, "staking")}
                                onClick={() => {
                                  onChangeStake("stake", false);
                                }}
                              >
                                {txnButtonText(pendingTransactions, "staking", "Stake HAL")}
                              </Button>
                            ) : (
                              <Button
                                className="stake-button"
                                variant="contained"
                                color="primary"
                                disabled={isPendingTxn(pendingTransactions, "approve_staking")}
                                onClick={() => {
                                  onSeekApproval("ohm");
                                }}
                              >
                                {txnButtonText(pendingTransactions, "approve_staking", "Approve")}
                              </Button>
                            )}
                          </TabPanel>
                          <TabPanel value={view} index={1} className="stake-tab-panel">
                            {isAllowanceDataLoading ? (
                              <Skeleton />
                            ) : address && hasAllowance("sohm") ? (
                              <Button
                                className="stake-button"
                                variant="contained"
                                color="primary"
                                disabled={isPendingTxn(pendingTransactions, "unstaking")}
                                onClick={() => {
                                  onChangeStake("unstake", false);
                                }}
                              >
                                {txnButtonText(pendingTransactions, "unstaking", "Unstake HAL")}
                              </Button>
                            ) : (
                              <Button
                                className="stake-button"
                                variant="contained"
                                color="primary"
                                disabled={isPendingTxn(pendingTransactions, "approve_unstaking")}
                                onClick={() => {
                                  onSeekApproval("sohm");
                                }}
                              >
                                {txnButtonText(pendingTransactions, "approve_unstaking", "Approve")}
                              </Button>
                            )}
                          </TabPanel>
                        </Box>
                      </Box>

                      <div className={`stake-user-data`}>
                        <div className="data-row">
                          <Typography variant="body1">Your Balance (After Deduction of "Initial 24 Hours Deposit")</Typography>
                          <Typography variant="body1">
                            {isAppLoading ? <Skeleton width="80px" /> : <>{trim(ohmBalance, 4)} HAL</>}
                          </Typography>
                        </div>
                        <div className="data-row">
                          <Typography variant="body1">Your Staked Balance</Typography>
                          <Typography variant="body1">
                            {isAppLoading ? <Skeleton width="80px" /> : <>{trimmedBalance} sHAL</>}
                          </Typography>
                        </div>

                        <div className="data-row">
                          <Typography variant="body1">Next Reward Amount</Typography>
                          <Typography variant="body1">
                            {isAppLoading ? <Skeleton width="80px" /> : <>{nextRewardValue} sHAL</>}
                          </Typography>
                        </div>

                        <div className="data-row">
                          <Typography variant="body1">Next Reward Yield</Typography>
                          <Typography variant="body1">
                            {isAppLoading ? <Skeleton width="80px" /> : <>{stakingRebasePercentage}%</>}
                          </Typography>
                        </div>

                        <div className="data-row">
                          <Typography variant="body1">ROI (5-Day Rate)</Typography>
                          <Typography variant="body1">
                            {isAppLoading ? <Skeleton width="80px" /> : <>{trim(fiveDayRate * 100, 4)}%</>}
                          </Typography>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Grid>
            </Paper>
          </Zoom>
        </div>
      </div>
    </>
  );
}

export default Stake;
