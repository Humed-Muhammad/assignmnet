import { BigNumberish, Contract, ethers, Signer } from 'ethers';
import { IGetContractDataTypes } from 'src/store/defaultSlice/slice/types';
import MemberRole from '../abi/MemberRole.json';

export interface GetLotteryResponseType {
  signer: Signer;
  connectedAccount: string;
}

export const formatEther = (value: BigNumberish | undefined) => {
  if (value) {
    const result = ethers.utils.formatEther(value);
    return result;
  }
};

export const getSmartContractData = async (
  data: GetLotteryResponseType,
): Promise<IGetContractDataTypes> => {
  const contract: Contract = new ethers.Contract(
    import.meta.env.VITE_PROD_CONTRACT_ADDRESS,
    MemberRole.abi,
    data.signer,
  );

  const membersCount = await contract?.membersCount();
  const roleTypesCount = await contract?.roleTypesCount();

  const roles = await contract?.getAllRoleTypes();
  const addresses = await contract?.getAllAdressess();

  return {
    contract,
    membersCount: membersCount.toNumber(),
    roles,
    usersAddress: addresses,
    roleTypesCount: roleTypesCount.toNumber(),
  };
};
