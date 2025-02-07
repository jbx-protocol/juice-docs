# CCIPHelper
[Git Source](https://github.com/Bananapus/nana-suckers/blob/faba69dd26a284c037886fb39a0fe6a34055e8dd/src/libraries/CCIPHelper.sol)

Global constants used across Juicebox contracts.


## State Variables
### ETH_ROUTER
The respective CCIP router used by the chain


```solidity
address public constant ETH_ROUTER = 0x80226fc0Ee2b096224EeAc085Bb9a8cba1146f7D;
```


### ETH_SEP_ROUTER

```solidity
address public constant ETH_SEP_ROUTER = 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59;
```


### OP_ROUTER

```solidity
address public constant OP_ROUTER = 0x3206695CaE29952f4b0c22a169725a865bc8Ce0f;
```


### OP_SEP_ROUTER

```solidity
address public constant OP_SEP_ROUTER = 0x114A20A10b43D4115e5aeef7345a1A71d2a60C57;
```


### ARB_ROUTER

```solidity
address public constant ARB_ROUTER = 0x141fa059441E0ca23ce184B6A78bafD2A517DdE8;
```


### ARB_SEP_ROUTER

```solidity
address public constant ARB_SEP_ROUTER = 0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165;
```


### POLY_ROUTER

```solidity
address public constant POLY_ROUTER = 0x849c5ED5a80F5B408Dd4969b78c2C8fdf0565Bfe;
```


### AVA_ROUTER

```solidity
address public constant AVA_ROUTER = 0xF4c7E640EdA248ef95972845a62bdC74237805dB;
```


### BNB_ROUTER

```solidity
address public constant BNB_ROUTER = 0x34B03Cb9086d7D758AC55af71584F81A598759FE;
```


### BASE_ROUTER

```solidity
address public constant BASE_ROUTER = 0x881e3A65B4d4a04dD529061dd0071cf975F58bCD;
```


### BASE_SEP_ROUTER

```solidity
address public constant BASE_SEP_ROUTER = 0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93;
```


### ETH_ID
The respective chain ids per network


```solidity
uint256 public constant ETH_ID = 1;
```


### ETH_SEP_ID

```solidity
uint256 public constant ETH_SEP_ID = 11_155_111;
```


### OP_ID

```solidity
uint256 public constant OP_ID = 10;
```


### OP_SEP_ID

```solidity
uint256 public constant OP_SEP_ID = 11_155_420;
```


### ARB_ID

```solidity
uint256 public constant ARB_ID = 42_161;
```


### ARB_SEP_ID

```solidity
uint256 public constant ARB_SEP_ID = 421_614;
```


### POLY_ID

```solidity
uint256 public constant POLY_ID = 137;
```


### AVA_ID

```solidity
uint256 public constant AVA_ID = 43_114;
```


### BNB_ID

```solidity
uint256 public constant BNB_ID = 56;
```


### BASE_ID

```solidity
uint256 public constant BASE_ID = 8453;
```


### BASE_SEP_ID

```solidity
uint256 public constant BASE_SEP_ID = 84_532;
```


### ETH_SEL
The chain selector per network


```solidity
uint64 public constant ETH_SEL = 5_009_297_550_715_157_269;
```


### ETH_SEP_SEL

```solidity
uint64 public constant ETH_SEP_SEL = 16_015_286_601_757_825_753;
```


### OP_SEL

```solidity
uint64 public constant OP_SEL = 3_734_403_246_176_062_136;
```


### OP_SEP_SEL

```solidity
uint64 public constant OP_SEP_SEL = 5_224_473_277_236_331_295;
```


### ARB_SEL

```solidity
uint64 public constant ARB_SEL = 4_949_039_107_694_359_620;
```


### ARB_SEP_SEL

```solidity
uint64 public constant ARB_SEP_SEL = 3_478_487_238_524_512_106;
```


### POLY_SEL

```solidity
uint64 public constant POLY_SEL = 4_051_577_828_743_386_545;
```


### AVA_SEL

```solidity
uint64 public constant AVA_SEL = 6_433_500_567_565_415_381;
```


### BNB_SEL

```solidity
uint64 public constant BNB_SEL = 11_344_663_589_394_136_015;
```


### BASE_SEL

```solidity
uint64 public constant BASE_SEL = 15_971_525_489_660_198_786;
```


### BASE_SEP_SEL

```solidity
uint64 public constant BASE_SEP_SEL = 10_344_971_235_874_465_080;
```


### ETH_WETH
The WETH address of each chain


```solidity
address public constant ETH_WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
```


### ETH_SEP_WETH

```solidity
address public constant ETH_SEP_WETH = 0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534;
```


### OP_WETH

```solidity
address public constant OP_WETH = 0x4200000000000000000000000000000000000006;
```


### ARB_WETH

```solidity
address public constant ARB_WETH = 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1;
```


### ARB_SEP_WETH

```solidity
address public constant ARB_SEP_WETH = 0xE591bf0A0CF924A0674d7792db046B23CEbF5f34;
```


### POLY_WETH

```solidity
address public constant POLY_WETH = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;
```


### AVA_WETH

```solidity
address public constant AVA_WETH = 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7;
```


### BNB_WETH

```solidity
address public constant BNB_WETH = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
```


### BASE_WETH

```solidity
address public constant BASE_WETH = 0x4200000000000000000000000000000000000006;
```


## Functions
### routerOfChain


```solidity
function routerOfChain(uint256 _chainId) internal pure returns (address router);
```

### selectorOfChain


```solidity
function selectorOfChain(uint256 _chainId) internal pure returns (uint64 selectorId);
```

### wethOfChain


```solidity
function wethOfChain(uint256 _chainId) public pure returns (address weth);
```

