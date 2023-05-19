import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { pointRuleAPI } from '@api';
import { enumRuleType, PATH_EARN_POINTS_RULE_LIST, PATH_CREATE_EARN_POINTS_RULE } from '@configs';
import {
  ICashbackRule,
  IGetCashbackRuleRoot,
  IGetRulesParams,
  IGetTiersParams,
  IRule,
} from '@interfaces';
import { getTimeDuration, LogApp } from '@utils';
import { CashbackRulesSection } from '@components';
import { debounce } from 'lodash';
import { selectApp, setCurrentPage, setTableLoading, useAppDispatch, useAppSelector } from '@redux';

export const CashbackRulesModule = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentPage } = useAppSelector(selectApp);

  const [rules, setRules] = useState<ICashbackRule[]>([]);
  const [pagination, setPagination] = useState({
    count: 0,
    maxPage: 1,
    limit: 0,
  });

  const [payload, setPayload] = useState<IGetRulesParams>({
    page: currentPage || 1,
    limit: 10,
    title: '',
  });

  const getRules = useCallback(async () => {
    try {
      dispatch(setTableLoading(true));
      const res: IGetCashbackRuleRoot = await pointRuleAPI.getRules(payload);
      const listRules = res.data?.rules as IRule[];
      // const listCashbackRules = listRules
      //   .filter(
      //     (val) =>
      //       val?.rule_type === enumRuleType.standard || val?.rule_type === enumRuleType.superior
      //   )
      //   .map((item, index) => {
      //     return {
      //       ...item,
      //       no: index + 1,
      //       duration: getTimeDuration({
      //         startTime: item?.start_time,
      //         endTime: item?.end_time,
      //       }),
      //     };
      //   }) as ICashbackRule[];

      const listCashbackRules = listRules.reduce(
        (prev: any, item: ICashbackRule, index: number) =>
          item?.rule_type === enumRuleType.standard || item?.rule_type === enumRuleType.superior //filter + map
            ? [
                ...prev,
                {
                  ...item,
                  no: index + 1,
                  duration: getTimeDuration({
                    startTime: item?.start_time,
                    endTime: item?.end_time,
                    noEnd: item?.noend,
                  }),
                },
              ]
            : prev,
        [],
      );
      setRules(listCashbackRules);
      setPagination({
        count: res.data.count,
        maxPage: res.data.maxPage,
        limit: res.data.limit,
      });
    } catch (error) {
      LogApp(error);
    } finally {
      dispatch(setTableLoading(false));
    }
  }, [payload.title, payload.page, payload.limit]);

  const onSearch = debounce((value: string) => {
    LogApp('Check search', value);
    setPayload({ ...payload, title: value.trim(), page: 1 });
  }, 600);

  const onEditRule = (id: number | string) => {
    navigate(PATH_EARN_POINTS_RULE_LIST + `/edit/${id}`);
  };

  const onNavigateToCreatePage = () => {
    navigate(PATH_CREATE_EARN_POINTS_RULE);
  };

  const handleChangePage = (page: number) => {
    setPayload({ ...payload, page });
    dispatch(setCurrentPage(Number(page)));
  };

  const handleChangePageSize = (size: number) => {
    setPayload({ ...payload, limit: size });
  };

  useEffect(() => {
    getRules();
  }, [payload.title, payload.page, payload.limit]);

  return (
    <CashbackRulesSection
      onSearch={onSearch}
      onEdit={onEditRule}
      currentPage={payload.page}
      data={rules}
      onCreate={onNavigateToCreatePage}
      pagination={pagination}
      onPageChange={handleChangePage}
      onChangePageSize={handleChangePageSize}
    />
  );
};
