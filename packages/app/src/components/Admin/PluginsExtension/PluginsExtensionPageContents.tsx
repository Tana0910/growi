import React from 'react';

import { usePluginEntries } from '~/stores/context';

import Loading from './Loading';
import { PluginCard } from './PluginCard';
import { PluginInstallerForm } from './PluginInstallerForm';
// TODO: i18n

export const PluginsExtensionPageContents = (): JSX.Element => {
  const { data, mutate } = usePluginEntries();

  if (data == null) {
    return <Loading />;
  }

  return (
    <div>

      <div className="row mb-5">
        <div className="col-lg-12">
          <h2 className="admin-setting-header">Plugin Installer</h2>
          <PluginInstallerForm />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-12">
          <h2 className="admin-setting-header">Plugins
            <button type="button" className="btn btn-sm ml-auto grw-btn-reload" onClick={() => mutate()}>
              <i className="icon icon-reload"></i>
            </button>
          </h2>
          <div className="d-grid gap-5">
            { data.map((item) => {
              const pluginName = item[0].meta.name;
              const pluginUrl = item[0].origin.url;
              const pluginDiscription = item[0].meta.desc;
              return <PluginCard key={pluginName} name={pluginName} url={pluginUrl} description={pluginDiscription} />;
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
