import { BigNumberish, Contract, ethers, Signer } from 'ethers';
import MemberRole from '../abi/MemberRole.json';

export interface GetLotteryResponseType {
  signer: Signer;
  connectedAccount: string;
  gasPrice: BigNumberish;
}

export const formatEther = (value: BigNumberish | undefined) => {
  if (value) {
    const result = ethers.formatEther(value);
    return result;
  }
};

export const getLotteryData = async (data: GetLotteryResponseType) => {
  const contract: Contract = new ethers.Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    MemberRole.abi,
    data.signer,
  );
  console.log(data.gasPrice);

  // console.log(
  //   import.meta.env.VITE_CONTRACT_ADDRESS,
  //   MemberRole.abi,
  //   data.signer,
  //   data.connectedAccount,
  // );

  // const roles = await contract?.addRoleType('CreateRole');
  const addresses = await contract?.roleTypesCount();
  // const rolesTypes = await contract?.roleTypes(data.connectedAccount, {
  //   gasPrice: 22,
  //   gasLimit: 6385876,
  // });
  // const owner = await contract?.owner();
  console.log(contract, addresses);

  return {
    // owner,
    contract,
  };
};
