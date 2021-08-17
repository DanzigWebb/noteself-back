export namespace UiActions {
  export class ShowNavbar {
    static readonly type = '[Ui.Navbar] Show Navbar';
  }

  export class HideNavbar {
    static readonly type = '[Ui.Navbar] Hide Navbar';
  }

  export class ToggleNavbar {
    static readonly type = '[Ui.Navbar] Toggle Navbar';
  }

  export class SetWidthNavbar {
    static readonly type = '[Ui.Navbar] Set Width';
    constructor(public width: number) {
    }
  }

  export class SetWidthNotebar {
    static readonly type = '[Ui.Notebar] Set Width';
    constructor(public width: number) {
    }
  }

  export class ShowCombinebar {
    static readonly type = '[Ui.Combinebar] Show';
  }

  export class HideCombinebar {
    static readonly type = '[Ui.Combinebar] Hide';
  }

  export class ToggleCombinebar {
    static readonly type = '[Ui.Combinebar] Toggle';
  }
}

