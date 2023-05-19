import { tierAPI } from '@api';
import {
  DownIcon,
  EditBoxIcon,
  PopoverPopup,
  SharedButton,
  TickBox,
  TierTable,
  UpIcon,
} from '@components';
import {
  enumRole,
  enumStatus,
  MAXIMUM_LIMIT,
  PATH_CREATE_EARN_POINTS_RULE,
  PATH_CUSTOMER_TIERS,
} from '@configs';
import { IGetTiersParams, TierResponse, TierRoot } from '@interfaces';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogApp, swapElement, useCancelRequest, useForceUpdate } from '@utils';
import { toast } from 'react-toastify';
import {
  selectApp,
  setCurrentPage,
  setLoading,
  setTableLoading,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import { useImmer } from 'use-immer';
import { debounce } from 'lodash';
import styled from 'styled-components';

export const TierTableModule = () => {
  const dispatch = useAppDispatch();
  const { themeMode, currentPage } = useAppSelector(selectApp);

  const navigate = useNavigate();
  const [tiers, setTiers] = useImmer<any>({
    limit: 10,
    count: 1,
    data: [],
  });
  const [payload, setPayload] = useState<IGetTiersParams>({
    page: currentPage || 1,
    num: 10,
    name: '',
    status: enumStatus.NONE,
  });
  const [isLevelChanging, setIsLevelChanging] = useState<boolean>(false);
  const [tiersChanging, setTiersChanging] = useState<any[]>([]);

  const [updateData, setUpdateData] = useState<number>(0);

  const columns: ColumnsType<any> = useMemo(() => {
    return [
      {
        title: '',
        render: (value, record, index) => {
          const isFist = value?.no === 1;
          return (
            <div className="level">
              {isLevelChanging && (
                <div className="level-change">
                  <SharedButton onClick={() => handleLevelUp(value?.no - 1)} disabled={isFist}>
                    <UpIcon />
                  </SharedButton>
                  <SharedButton
                    onClick={() => handlLevelDown(value?.no - 1)}
                    disabled={index + 1 === tiersChanging?.length}
                  >
                    <DownIcon />
                  </SharedButton>
                </div>
              )}
              {/* <span className="level-text">{value?.level}</span> */}
            </div>
          );
        },
        key: `level-${isLevelChanging}`,
        width: '15%',
        hidden: !isLevelChanging ? true : false,
      },
      // {
      //   title: 'No.',
      //   dataIndex: 'no',
      //   key: 'no',
      //   width: '10%',
      // },
      {
        title: 'No.',
        // dataIndex: 'no',
        // key: 'no',
        render: (text, record, index) => index + (currentPage - 1) * 10 + 1,
        width: '10%',
      },
      { title: 'Tier name', dataIndex: 'tierName', key: 'tierName' },
      { title: 'Condition', dataIndex: 'condition', key: 'condition' },
      { title: 'Months of status', dataIndex: 'monthsOfStatus', key: 'monthsOfStatus' },
      { title: 'Main tier', dataIndex: 'mainTier', key: 'mainTier' },
      {
        title: 'Status tier',
        dataIndex: '',
        key: 's',
        render: (value: any) => {
          const isActive = value?.statusTier;
          return (
            <>
              <PopoverPopup
                roleDelete={enumRole.S_MANAGER}
                content={
                  <StyledConfirmPopup>
                    <h5 className="text-center items-center mb-2 text-current text-base">
                      {isActive ? 'Deactivate' : 'Reactivate'}
                    </h5>
                    <p className="text-sm">
                      Are you sure {isActive ? 'deactivate' : 'reactivate'} this tier?
                    </p>
                  </StyledConfirmPopup>
                }
                isHaveConfirmButton
                onConfirm={() => {
                  value.onChangeStatus(!value.statusTier);
                }}
                allowOpen={isLevelChanging ? false : true}
              >
                <div className={'flex items-center lg:justify-center cursor-pointer'}>
                  <EditBoxIcon
                    size={16}
                    className="mr-2"
                    color={isActive ? 'rgb(13 148 136)' : 'rgb(185 28 28)'}
                  />
                  <a
                    onClick={() => {}}
                    className={
                      isActive ? 'text-success hover:text-success' : 'text-danger hover:text-danger'
                    }
                  >
                    {isActive ? 'Active' : 'Inactive'}
                  </a>
                </div>
              </PopoverPopup>
            </>
          );
        },
        // hidden: isLevelChanging ? true : false,
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (value: any) => {
          return (
            <StyledEditBtn>
              <SharedButton
                textColor="white"
                // backgroundColor={MAIN_THEME_DATA.mainColor}
                className="edit-btn btn-edit"
                prevIcon={<EditBoxIcon size={16} color="white" />}
                text="Edit"
                onClick={() => {
                  value.onEdit();
                }}
              />
            </StyledEditBtn>
          );
        },
        hidden: isLevelChanging ? true : false,
      },
    ];
  }, [currentPage, isLevelChanging, tiersChanging]);

  const onSearch = debounce((value: string) => {
    setPayload({ ...payload, name: value.trim(), page: 1 });
  }, 500);
  const onEdit = (id: number) => {
    navigate(PATH_CUSTOMER_TIERS + `/edit/${id}`);
  };
  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(Number(page)));
    setPayload({ ...payload, page });
  };

  const onChangeStatus = (id: number) => async (status: boolean) => {
    try {
      const res = await tierAPI.editTier(id, { status });
      toast.success('Change tier status to ' + (status ? 'active!' : 'inactive!'), {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: themeMode,
      });
      setTiers((draft: any) => {
        const foundIndex = draft.data.findIndex((item: any) => item.key === id);
        draft.data[foundIndex].statusTier = status;
      });
    } catch (error) {}
  };
  const getTiers = useCallback(
    async (signal?: AbortSignal) => {
      try {
        dispatch(setTableLoading(true));
        setTiers({ ...tiers, data: [] });
        setTiersChanging([]);
        const res: TierRoot = await tierAPI.getTiers({ ...payload, signal });
        const newResponse: any[] = res.data.tiers.map((item, index) => {
          return {
            key: item?.id,
            no: index + 1,
            tierName: item.name,
            monthsOfStatus: `${item.period || 0} months`,
            condition: `$${item.cash_threshold || 0}`,
            mainTier: `$${item.cash_to_remain || 0}`,
            statusTier: item.status,
            level: item?.index,
            isLevelChangeing: isLevelChanging,
            onEdit: () => {
              onEdit(item.id);
            },
            onChangeStatus: (value: any) => {
              onChangeStatus(item.id)(value);
            },
          };
        });
        setTiers({
          limit: res.data.limit,
          count: res.data.count,
          data: newResponse,
        });
        setTiersChanging(newResponse);
      } catch (error) {
      } finally {
        dispatch(setTableLoading(false));
      }
    },
    [payload.name, payload.page, payload.num, payload.status]
  );

  const handleChangePageSize = (size: number) => {
    setPayload({ ...payload, num: size });
  };

  useEffect(() => {
    getTiers();
  }, [payload.name, payload.page, payload.num, payload.status]);
  // useCancelRequest(getTiers, () => LogApp(true));

  const onNavigateToCreatePage = () => {
    navigate(PATH_CREATE_EARN_POINTS_RULE);
  };

  const onShowLevelChangingMopde = () => {
    setPayload({ ...payload, num: MAXIMUM_LIMIT, status: enumStatus.ACTIVE });
    setIsLevelChanging(true);
  };

  const onSaveLevelUpdate = async () => {
    try {
      dispatch(setLoading(true));
      const newTiersLevel = tiersChanging?.map((item) => ({
        id: Number(item?.key),
        index: Number(item.level),
      }));
      await tierAPI.updateTierLevel({
        tiers: newTiersLevel,
      });
      toast.success('Update tier level successfully!', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: themeMode,
      });
      // setTiers({ ...tiers, data: tiersChanging });
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
      setIsLevelChanging(false);
      setPayload({ ...payload, num: 10, status: enumStatus.NONE });
    }
  };
  const onReverseLevel = () => {
    setTiersChanging(tiers?.data);
    setIsLevelChanging(false);
  };

  const handleLevelUp = (curIndex: number) => {
    LogApp('LevelUp curIndex', curIndex);
    LogApp('LevelUp TierChanging', tiersChanging);
    const changedLevelTiers = tiersChanging?.map((item, index) => {
      if (index === curIndex - 1)
        return {
          ...item,
          level: tiersChanging?.[index + 1]?.level,
          no: item.no + 1,
        };
      else if (index === curIndex) {
        LogApp(' prev of current items', tiersChanging?.[index]);
        return {
          ...item,
          level: tiersChanging?.[index - 1]?.level,
          no: item.no - 1,
        };
      } else return item;
    });
    LogApp('LevelUp changedLevelTiers', changedLevelTiers);
    const orderedArray = swapElement(changedLevelTiers, curIndex, curIndex - 1);
    LogApp('LevelUp orderedArray', orderedArray);
    setTiersChanging(orderedArray);
  };

  const handlLevelDown = (curIndex: number) => {
    const changedLevelTiers = tiersChanging?.map((item, index) => {
      if (index === curIndex)
        return { ...item, level: tiersChanging?.[index + 1]?.level, no: item.no + 1 };
      else if (index === curIndex + 1)
        return { ...item, level: tiersChanging?.[index - 1]?.level, no: item.no - 1 };
      else return item;
    });
    const orderedArray = swapElement(changedLevelTiers, curIndex, curIndex + 1);
    setTiersChanging(orderedArray);
  };

  LogApp('changeL Ging', tiersChanging);

  return (
    <TierTable
      onSearch={onSearch}
      columns={columns}
      tiers={tiers}
      isLevelChanging={isLevelChanging}
      tiersChanging={tiersChanging}
      onNavigate={onNavigateToCreatePage}
      currentPage={payload.page}
      onPageChange={onPageChange}
      onChangePageSize={handleChangePageSize}
      onShowLevelChangingMopde={onShowLevelChangingMopde}
      onSaveLevelUpdate={onSaveLevelUpdate}
      onReverseLevel={onReverseLevel}
    />
  );
};
const StyledConfirmPopup = styled.div``;
const StyledEditBtn = styled.div`
  display: flex;
  justify-content: center;
  .edit-btn {
    padding: 0.8rem 1.8rem;
    width: fit-content;
    align-self: center;
  }
`;
