'use babel';

import AtomTerminalView from './atom-terminal-view';
import { CompositeDisposable } from 'atom';

export default {

  atomTerminalView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomTerminalView = new AtomTerminalView(state.atomTerminalViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomTerminalView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-terminal:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomTerminalView.destroy();
  },

  serialize() {
    return {
      atomTerminalViewState: this.atomTerminalView.serialize()
    };
  },

  toggle() {
    console.log('AtomTerminal was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
