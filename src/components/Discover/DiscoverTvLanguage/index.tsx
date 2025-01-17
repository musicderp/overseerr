import React from 'react';
import type { TvResult } from '../../../../server/models/Search';
import { useRouter } from '../../../hooks/useRouter';
import ListView from '../../Common/ListView';
import { defineMessages, useIntl } from 'react-intl';
import Header from '../../Common/Header';
import PageTitle from '../../Common/PageTitle';
import globalMessages from '../../../i18n/globalMessages';
import useDiscover from '../../../hooks/useDiscover';
import Error from '../../../pages/_error';

const messages = defineMessages({
  languageSeries: '{language} Series',
});

const DiscoverTvLanguage: React.FC = () => {
  const router = useRouter();
  const intl = useIntl();

  const {
    isLoadingInitialData,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    titles,
    fetchMore,
    error,
  } = useDiscover<
    TvResult,
    {
      originalLanguage: {
        iso_639_1: string;
        english_name: string;
        name: string;
      };
    }
  >(`/api/v1/discover/tv/language/${router.query.language}`);

  if (error) {
    return <Error statusCode={500} />;
  }

  const title = isLoadingInitialData
    ? intl.formatMessage(globalMessages.loading)
    : intl.formatMessage(messages.languageSeries, {
        language: intl.formatDisplayName(router.query.language as string, {
          type: 'language',
          fallback: 'none',
        }),
      });

  return (
    <>
      <PageTitle title={title} />
      <div className="mt-1 mb-5">
        <Header>{title}</Header>
      </div>
      <ListView
        items={titles}
        isEmpty={isEmpty}
        isLoading={
          isLoadingInitialData || (isLoadingMore && (titles?.length ?? 0) > 0)
        }
        isReachingEnd={isReachingEnd}
        onScrollBottom={fetchMore}
      />
    </>
  );
};

export default DiscoverTvLanguage;
