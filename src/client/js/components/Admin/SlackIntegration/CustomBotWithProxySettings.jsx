import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import AppContainer from '../../../services/AppContainer';
import AdminAppContainer from '../../../services/AdminAppContainer';
import { withUnstatedContainers } from '../../UnstatedUtils';
import CustomBotWithProxyIntegrationCard from './CustomBotWithProxyIntegrationCard';
import CustomBotWithProxySettingsAccordion from './CustomBotWithProxySettingsAccordion';

const CustomBotWithProxySettings = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { appContainer, adminAppContainer } = props;
  const { t } = useTranslation();

  return (
    <>

      <h2 className="admin-setting-header mb-2">{t('admin:slack_integration.custom_bot_with_proxy_integration')}</h2>

      {/* TODO delete tmp props */}
      <CustomBotWithProxyIntegrationCard
        siteName="GROWI"
        slackWSNameInWithProxy="SlackWorkSpaceName"
        isSlackScopeSet
      />
      <h2 className="admin-setting-header">{t('admin:slack_integration.cooperation_procedure')}</h2>
      <div className="mx-3">
        <div className="d-flex flex-column pull-right">
          <button
            className="my-3 btn btn-outline-danger"
            type="button"
          ><i className="icon-trash mr-1" />{t('admin:slack_integration.delete')}
          </button>
        </div>

        <div className="d-flex flex-column my-5 w-100">
          <CustomBotWithProxySettingsAccordion />
        </div>
      </div>
    </>
  );
};

const CustomBotWithProxySettingsWrapper = withUnstatedContainers(CustomBotWithProxySettings, [AppContainer, AdminAppContainer]);

CustomBotWithProxySettings.propTypes = {
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  adminAppContainer: PropTypes.instanceOf(AdminAppContainer).isRequired,
};

export default CustomBotWithProxySettingsWrapper;
