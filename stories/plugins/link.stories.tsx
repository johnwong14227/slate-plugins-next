import React, { useMemo, useState } from 'react';
import { Link } from '@material-ui/icons';
import { boolean } from '@storybook/addon-knobs';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import {
  EditablePlugins,
  HeadingToolbar,
  LinkPlugin,
  renderElementLink,
  ToolbarLink,
  withLink,
} from '../../packages/slate-plugins/src';
import { initialValueLinks } from '../config/initialValues';

export default {
  title: 'Plugins/Link',
  component: LinkPlugin,
  subcomponents: {
    renderElementLink,
    LinkButton: ToolbarLink,
  },
};

export const Example = () => {
  const plugins: any[] = [];
  if (boolean('LinkPlugin', true)) plugins.push(LinkPlugin());

  const createReactEditor = () => () => {
    const [value, setValue] = useState(initialValueLinks);

    const editor = useMemo(
      () => withLink(withHistory(withReact(createEditor()))),
      []
    );

    return (
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <HeadingToolbar>
          <ToolbarLink icon={<Link />} />
        </HeadingToolbar>
        <EditablePlugins plugins={plugins} placeholder="Enter some text..." />
      </Slate>
    );
  };

  const Editor = createReactEditor();

  return <Editor />;
};
