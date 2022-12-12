import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
import { ReactComponent as OhmDaiImg } from "src/assets/tokens/OHM-DAI.svg";
import { ReactComponent as TRPBUSDImg } from "src/assets/tokens/TRP-BUSD.svg";
import { ReactComponent as TRPUSDTImg } from "src/assets/tokens/TRP-USDT.svg";
import { ReactComponent as BUSDImg } from "src/assets/tokens/BUSD.svg";
import { ReactComponent as USDTImg } from "src/assets/tokens/USDT.svg";
import { ReactComponent as USDCImg } from "src/assets/tokens/USDC.svg";
import { ReactComponent as CAKEImg } from "src/assets/tokens/CAKE.svg";
import { ReactComponent as wBNBImg } from "src/assets/tokens/wBNB.svg";
import { ReactComponent as SCTImg } from "src/assets/tokens/SCT.svg";

import { ReactComponent as MTNBNBImg } from "src/assets/tokens/MTN-BNB.svg";
import { ReactComponent as FraxImg } from "src/assets/tokens/FRAX.svg";
import { ReactComponent as OhmFraxImg } from "src/assets/tokens/OHM-FRAX.svg";
import { ReactComponent as OhmLusdImg } from "src/assets/tokens/OHM-LUSD.svg";
import { ReactComponent as OhmEthImg } from "src/assets/tokens/OHM-WETH.svg";
import { ReactComponent as wETHImg } from "src/assets/tokens/wETH.svg";
import { ReactComponent as LusdImg } from "src/assets/tokens/LUSD.svg";


import { ReactComponent as HecUsdcImg } from "src/assets/tokens/MTN-USDC.svg";

import { abi as FraxOhmBondContract } from "src/abi/bonds/OhmFraxContract.json";
import { abi as BondOhmDaiContract } from "src/abi/bonds/OhmDaiContract.json";
import { abi as BondwBNBContract } from "src/abi/bonds/wBNBContract.json";

import { abi as HecUsdcContract } from "src/abi/bonds/HecUsdcContract.json";
import { abi as BondOhmLusdContract } from "src/abi/bonds/OhmLusdContract.json";
import { abi as BondOhmEthContract } from "src/abi/bonds/OhmEthContract.json";

import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as ReserveOhmLusdContract } from "src/abi/reserves/OhmLusd.json";
import { abi as ReserveOhmDaiContract } from "src/abi/reserves/OhmDai.json";
import { abi as ReserveHecUsdcContract } from "src/abi/reserves/HecUsdc.json";
import { abi as ReserveMtnBusdContract } from "src/abi/reserves/MtnBusd.json";
import { abi as ReserveOhmFraxContract } from "src/abi/reserves/OhmFrax.json";
import { abi as ReserveOhmEthContract } from "src/abi/reserves/OhmEth.json";

import { abi as FourBondContract } from "src/abi/bonds/FourBond.json";

import { abi as SctBondContract } from "src/abi/bonds/SctBondContract.json";
import { abi as CakeBondContract } from "src/abi/bonds/CakeBondContract.json";
import { abi as FraxBondContract } from "src/abi/bonds/FraxContract.json";
import { abi as LusdBondContract } from "src/abi/bonds/LusdContract.json";
import { abi as EthBondContract } from "src/abi/bonds/EthContract.json";

import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { getBondCalculator } from "src/helpers/BondCalculator";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond

export const usdc = new StableBond({
  name: "usdc",
  displayName: "USDC",
  bondToken: "USDC",
  bondIconSvg: USDCImg,
  bondContractABI: BondOhmDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x0000000000000000000000000000000000000000",    // Dai Bond Depository address
      reserveAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // Dai address
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x6f452D25d69370e85eD42eDeEC9a4567B32f4516",
      reserveAddress: "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C",
    },
  },
});

export const dai = new StableBond({
  name: "dai",
  displayName: "DAI",
  bondToken: "DAI",
  bondIconSvg: DaiImg,
  bondContractABI: BondOhmDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x0000000000000000000000000000000000000000",    // Dai Bond Depository address
      reserveAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // Dai address
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x5cb8780d8a7F0F68312a9010CdA930AAef893d4d",
      reserveAddress: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
    },
  },
});


export const ohm_usdc = new LPBond({
  name: "hal_usdc_lp",
  displayName: "HAL-USDC LP",
  bondToken: "USDC",
  bondIconSvg: TRPBUSDImg,
  bondContractABI: BondOhmDaiContract,
  reserveContract: ReserveOhmDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x0000000000000000000000000000000000000000",
      reserveAddress: "0x0000000000000000000000000000000000000000",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xc8b0B7d9Ec9021a29A63f0CB90fD8CBA147d2222",
      reserveAddress: "0xdeE74528651CD847f1123717E7A4E51E8e93C8Ed",
    },
  },
  lpUrl:
    "https://goerli.etherscan.io/address/0xdeE74528651CD847f1123717E7A4E51E8e93C8Ed",
});




// export const sct = new CustomBond({
//   name: "sct",
//   displayName: "SCT",
//   lpUrl: "",
//   bondType: BondType.StableAsset,
//   bondToken: "SCT",
//   bondIconSvg: SCTImg,
//   bondContractABI: SctBondContract ,
//   reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xF096Ae580C6F833612bECD3a29224aCe4B5f2b59",
//       reserveAddress: "0x76A8171ca00c6DeFc93c05Ab3eb71cb6B0241F2a",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xca7b90f8158A4FAA606952c023596EE6d322bcf0",
//       reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
//     },
//   },
//   customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
//     const SctBondContract = this.getContractForBond(networkID, provider);
//     let ethPrice = await SctBondContract.assetPrice();
//     ethPrice = ethPrice / Math.pow(10, 8);
//     const token = this.getContractForReserve(networkID, provider);
//     let ethAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
//     ethAmount = ethAmount / Math.pow(10, 18);
//     return ethAmount * ethPrice;
//   },
// });



// export const usdt = new StableBond({
//   name: "usdt",
//   displayName: "USDT",
//   bondToken: "USDT",
//   bondIconSvg: USDTImg,
//   bondContractABI: BondOhmDaiContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xf6e6538fc658fcb0fF4F67866E57554F0E885FA1",    // Dai Bond Depository address
//       reserveAddress: "0x55d398326f99059fF775485246999027B3197955", // Dai address
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
//       reserveAddress: "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C",
//     },
//   },
// });

// export const trp_usdt = new LPBond({
//   name: "TRP_usdt_lp",
//   displayName: "TRP-USDT LP",
//   bondToken: "USDT",
//   bondIconSvg: TRPUSDTImg,
//   bondContractABI: BondOhmDaiContract,
//   reserveContract: ReserveOhmDaiContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xdb707804EdFcD5Db311701C291Ba537d589F1e96",
//       reserveAddress: "0x83545e1a68c9e20c2889e2edf07f754888d41648",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
//       reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
//     },
//   },
//   lpUrl:
//     "https://pancakeswap.finance/add/0x55d398326f99059fF775485246999027B3197955/0x14f070fAf299A2E7E920f5D883fCF74629097dD9",
// });

// export const usdc = new StableBond({
//   name: "usdc_18",
//   displayName: "USDC",
//   bondToken: "USDC",
//   bondIconSvg: USDCImg,
//   bondContractABI: BondOhmDaiContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x08a5Af55BC8163e8d46f83459dFc26555Cf17526",    // Dai Bond Depository address
//       reserveAddress: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", // Dai address
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
//       reserveAddress: "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C",
//     },
//   },
// });


// export const cake = new CustomBond({
//   name: "cake",
//   displayName: "CAKE",
//   lpUrl: "",
//   bondType: BondType.StableAsset,
//   bondToken: "CAKE",
//   bondIconSvg: CAKEImg,
//   bondContractABI: CakeBondContract ,
//   reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x2F56562733a3eb498a2fD4BeE10989B9b87D287e",
//       reserveAddress: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xca7b90f8158A4FAA606952c023596EE6d322bcf0",
//       reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
//     },
//   },
//   customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
//     const CakeBondContract = this.getContractForBond(networkID, provider);
//     let ethPrice = await CakeBondContract.assetPrice();
//     ethPrice = ethPrice / Math.pow(10, 8);
//     const token = this.getContractForReserve(networkID, provider);
//     let ethAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
//     ethAmount = ethAmount / Math.pow(10, 18);
//     return ethAmount * ethPrice;
//   },
// });



// export const wbnb = new CustomBond({
//   name: "wbnb",
//   displayName: "wBNB",
//   lpUrl: "",
//   bondType: BondType.StableAsset,
//   bondToken: "wBNB",
//   bondIconSvg: wBNBImg,
//   bondContractABI: CakeBondContract ,
//   reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x133148Ad8C462BD2c81445A2E673f0c7B9c206FC",
//       reserveAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xca7b90f8158A4FAA606952c023596EE6d322bcf0",
//       reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
//     },
//   },
//   customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
//     const CakeBondContract = this.getContractForBond(networkID, provider);
//     let ethPrice = await CakeBondContract.assetPrice();
//     ethPrice = ethPrice / Math.pow(10, 8);
//     const token = this.getContractForReserve(networkID, provider);
//     let ethAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
//     ethAmount = ethAmount / Math.pow(10, 18);
//     return ethAmount * ethPrice;
//   },
// });


// export const busd4 = new StableBond({
//   name: "busd4",
//   displayName: "BUSD",
//   bondToken: "BUSD",
//   bondIconSvg: BUSDImg,
//   isFour: true,
//   isTotal: true,
//   bondContractABI: FourBondContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xaE7d359E6f33CF5751d1489b8307473743D37E97",
//       reserveAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
//       reserveAddress: "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C",
//     },
//   },
// });

// // -------------------------------------------end of bond list


// export const frax = new StableBond({
//   name: "frax",
//   displayName: "FRAX",
//   bondToken: "FRAX",
//   bondIconSvg: FraxImg,
//   bondContractABI: FraxBondContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x10C0f93f64e3C8D0a1b0f4B87d6155fd9e89D08D",
//       reserveAddress: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0x3aD02C4E4D1234590E87A1f9a73B8E0fd8CF8CCa",
//       reserveAddress: "0x45754dF05AA6305114004358eCf8D04FF3B84e26",
//     },
//   },
// });

// export const lusd = new StableBond({
//   name: "lusd",
//   displayName: "LUSD",
//   bondToken: "LUSD",
//   bondIconSvg: LusdImg,
//   bondContractABI: LusdBondContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x10C0f93f64e3C8D0a1b0f4B87d6155fd9e89D08D",
//       reserveAddress: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0x3aD02C4E4D1234590E87A1f9a73B8E0fd8CF8CCa",
//       reserveAddress: "0x45754dF05AA6305114004358eCf8D04FF3B84e26",
//     },
//   },
// });



// export const eth = new CustomBond({
//   name: "ftm",
//   displayName: "wFTM",
//   lpUrl: "",
//   bondType: BondType.StableAsset,
//   bondToken: "WFTM",
//   bondIconSvg: wETHImg,
//   bondContractABI: EthBondContract,
//   reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x72De9F0e51cA520379a341318870836FdCaf03B9",
//       reserveAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xca7b90f8158A4FAA606952c023596EE6d322bcf0",
//       reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
//     },
//   },
//   customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
//     const ethBondContract = this.getContractForBond(networkID, provider);
//     let ethPrice = await ethBondContract.assetPrice();
//     ethPrice = ethPrice / Math.pow(10, 8);
//     const token = this.getContractForReserve(networkID, provider);
//     let ethAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
//     ethAmount = ethAmount / Math.pow(10, 18);
//     return ethAmount * ethPrice;
//   },
// });

// export const ohm_frax = new LPBond({
//   name: "ohm_frax_lp",
//   displayName: "OHM-FRAX LP",
//   bondToken: "FRAX",
//   bondIconSvg: OhmFraxImg,
//   bondContractABI: FraxOhmBondContract,
//   reserveContract: ReserveOhmFraxContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xc20CffF07076858a7e642E396180EC390E5A02f7",
//       reserveAddress: "0x2dce0dda1c2f98e0f171de8333c3c6fe1bbf4877",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0x7BB53Ef5088AEF2Bb073D9C01DCa3a1D484FD1d2",
//       reserveAddress: "0x11BE404d7853BDE29A3e73237c952EcDCbBA031E",
//     },
//   },
//   lpUrl:
//     "https://app.uniswap.org/#/add/v2/0x853d955acef822db058eb8505911ed77f175b99e/0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0",
// });






// export const mtn_wbnb = new LPBond({
//   name: "MTN_BNB_lp",
//   displayName: "MTN-BNB LP",
//   bondToken: "BNB",
//   bondIconSvg: MTNBNBImg,
//   bondContractABI: BondwBNBContract,
//   reserveContract: ReserveMtnBusdContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xDB654546553143f0Da1b7216853dC9761cC3A8d5",
//       reserveAddress: "0x7a43e95c251ddbf26fe3a2af6c3f0d23790dfc8f",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
//       reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
//     },
//   },
//   lpUrl:
//     "https://pancakeswap.finance/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0x6dA729C9175A787275a7D49D62FE119881beF2f5",
// });

// export const hec_dai_v2 = new LPBond({
//   name: "hec_dai_lp",
//   displayName: "MTN-DAI LP v2",
//   bondToken: "DAI",
//   bondIconSvg: OhmDaiImg,
//   bondContractABI: BondOhmDaiContract,
//   reserveContract: ReserveOhmDaiContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x8780bEf1B73Ad4bE4fa653F5bE62A2b6cBCdAf98",
//       reserveAddress: "0x6cC9ef078930b3D182C7796ECF5E281fF8fEe316",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
//       reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
//     },
//   },
//   lpUrl:
//     "https://spookyswap.finance/add/0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0/0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
// });

// export const hec_usdc = new LPBond({
//   name: "hec_usdc_lp",
//   displayName: "MTN-USDC LP",
//   bondToken: "USDC",
//   bondIconSvg: HecUsdcImg,
//   bondContractABI: HecUsdcContract,
//   reserveContract: ReserveHecUsdcContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x3C57481f373Be0196A26A7d0a8E29E8CedC63ba1",
//       reserveAddress: "0xd661952749f05acc40503404938a91af9ac1473b",
//     },
//     [NetworkID.Testnet]: {
//       // NOTE (appleseed-lusd): using ohm-dai rinkeby contracts
//       bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
//       reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
//     },
//   },
//   lpUrl:
//     "https://swap.spiritswap.finance/#/add/0x04068DA6C83AFCFA0e13ba15A6696662335D5B75/0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0",
// });

// export const ohm_weth = new CustomBond({
//   name: "ohm_weth_lp",
//   displayName: "OHM-WETH LP",
//   bondToken: "WETH",
//   bondIconSvg: OhmEthImg,
//   bondContractABI: BondOhmEthContract,
//   reserveContract: ReserveOhmEthContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xB6C9dc843dEc44Aa305217c2BbC58B44438B6E16",
//       reserveAddress: "0xfffae4a0f4ac251f4705717cd24cadccc9f33e06",
//     },
//     [NetworkID.Testnet]: {
//       // NOTE (unbanksy): using ohm-dai rinkeby contracts
//       bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
//       reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
//     },
//   },
//   bondType: BondType.LP,
//   lpUrl:
//     "https://spookyswap.finance/add/0x5C4FDfc5233f935f20D2aDbA572F770c2E377Ab0/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
//   customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
//     if (networkID === NetworkID.Mainnet) {
//       const ethBondContract = this.getContractForBond(networkID, provider);
//       let ethPrice = await ethBondContract.assetPrice();
//       ethPrice = ethPrice / Math.pow(10, 8);
//       const token = this.getContractForReserve(networkID, provider);
//       const tokenAddress = this.getAddressForReserve(networkID);
//       const bondCalculator = getBondCalculator(networkID, provider);
//       const tokenAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
//       const valuation = await bondCalculator.valuation(tokenAddress, tokenAmount);
//       const markdown = await bondCalculator.markdown(tokenAddress);
//       let tokenUSD = (valuation / Math.pow(10, 9)) * (markdown / Math.pow(10, 18));
//       return tokenUSD * ethPrice;
//     } else {
//       // NOTE (appleseed): using OHM-DAI on rinkeby
//       const token = this.getContractForReserve(networkID, provider);
//       const tokenAddress = this.getAddressForReserve(networkID);
//       const bondCalculator = getBondCalculator(networkID, provider);
//       const tokenAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
//       const valuation = await bondCalculator.valuation(tokenAddress, tokenAmount);
//       const markdown = await bondCalculator.markdown(tokenAddress);
//       let tokenUSD = (valuation / Math.pow(10, 9)) * (markdown / Math.pow(10, 18));
//       return tokenUSD;
//     }
//   },
// });

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [usdc, dai, ohm_usdc];//mtn_wbnb, cake
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
