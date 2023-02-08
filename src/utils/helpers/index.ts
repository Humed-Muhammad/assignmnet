import { BigNumber, Contract, ethers, Signer } from 'ethers';
import MemberRole from '../abi/MemberRole.json';

export interface GetLotteryResponseType {
  signer: Signer;
  connectedAccount: string;
  // gasPrice: number;
  gasLimit: number;
}

// export const formatEther = (value: BigNumber | undefined) => {
//   if (value) {
//     const result = ethers.formatEther(value);
//     return result;
//   }
// };

export const getLotteryData = async (data: GetLotteryResponseType) => {
  const contract: Contract = new ethers.Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    MemberRole.abi,
    data.signer,
  );

  // console.log(
  //   import.meta.env.VITE_CONTRACT_ADDRESS,
  //   MemberRole.abi,
  //   data.signer,
  //   data.connectedAccount,
  // );
  const transactionOptions = {
    gasLimit: 6000000,
    gasPrice: ethers.utils.parseUnits('1.0', 'gwei'),
    // value: ethers.utils.parseEther('3.0'), // adding this should fix
  };
  // const roles = await contract?.addRoleType('CreateRole');
  const addresses = await contract?.roleTypes(
    data.connectedAccount,
    transactionOptions,
  );

  // const rolesTypes = await contract?.roleTypes(data.connectedAccount, {
  //   gasPrice: 22,
  //   gasLimit: 6385876,
  // });
  // const owner = await contract?.owner();
  console.log(addresses);

  return {
    // owner,
    contract,
  };
};
