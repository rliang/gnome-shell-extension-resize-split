const Meta = imports.gi.Meta;

function check(_, kb) {
  if (kb.get_name() !== 'begin-resize')
    return;
  const win = global.display.get_focus_window();
  if (!win || !win.get_maximized() || win.get_maximized() === Meta.MaximizeFlags.BOTH)
    return;
  const rect = win.get_frame_rect();
  const area = global.screen.get_active_workspace()
    .get_work_area_for_monitor(global.screen.get_current_monitor());
  const op = rect.x === area.x ?
    Meta.GrabOp.KEYBOARD_RESIZING_E : Meta.GrabOp.KEYBOARD_RESIZING_W;
  win.begin_grab_op(op, true, global.get_current_time());
  return true;
}

let _handle;

function enable() {
  _handle = global.window_manager.connect('filter-keybinding', check);
}

function disable() {
  global.window_manager.disconnect(_handle);
}
