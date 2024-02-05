let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /mnt/Data/code/fullstack/kampuni-area/comments
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +1 packages/ui-app/app/_events/usePusher.ts
badd +3 packages/be-gateway/src/lib/pusher-server.ts
badd +27 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventMoveTaskToOtherBoard.ts
badd +6 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/useBoardRealtimeUpdate.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/BoardContainer.tsx
badd +11 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/useBoardDndAction.ts
badd +19 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventSendTaskComment.ts
badd +25 packages/be-gateway/src/routes/comment/index.ts
badd +3 packages/be-gateway/src/routes/event/index.controller.ts
badd +11 packages/ui-app/services/comment.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/auth/index.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/middlewares/authMiddleware.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/middlewares/beProjectMemberMiddleware.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/project/pin.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/project/index.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/member/index.ts
badd +356 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/task/index.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/dashboard/index.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/favorite/index.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/automation/index.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/report/index.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/vision/index.ts
badd +144 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/storage/index.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/buzzer/index.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/project/project.controller.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/project/view.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/organization/storage.controller.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/organization/index.controller.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/routes/organization/member.controller.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/providers/auth/EmailAuthProvider.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/be-gateway/src/providers/auth/GoogleAuthProvider.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/kampuni/node_modules/.prisma/client/index.d.ts
badd +11 packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx
badd +8 packages/ui-app/app/\[orgID]/project/\[projectId]/board/index.tsx
badd +68 packages/ui-app/app/_features/TaskComments/context.tsx
badd +19 /mnt/Data/code/fullstack/kampuni-area/comments/packages/shared-models/src/lib/comment.ts
badd +16 /mnt/Data/code/fullstack/kampuni-area/comments/packages/shared-models/src/lib/member.ts
badd +2 packages/shared-models/src/index.ts
badd +14 packages/be-gateway/src/routes/activity/index.ts
badd +21 packages/shared-models/src/lib/index.ts
badd +5 packages/be-gateway/src/types.ts
badd +56 packages/shared-models/src/prisma/schema.prisma
badd +0 packages/ui-app/app/_features/TaskComments/TaskComment.tsx
badd +10 packages/be-gateway/src/routes/project/status.ts
badd +72 packages/ui-app/services/task.ts
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/BoardContainer.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 119 + 120) / 240)
exe '4resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 4resize ' . ((&columns * 119 + 120) / 240)
argglobal
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/useBoardDndAction.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 12 - ((11 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 12
normal! 042|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/useBoardRealtimeUpdate.ts", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/useBoardRealtimeUpdate.ts | else | edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/useBoardRealtimeUpdate.ts | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/useBoardRealtimeUpdate.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/BoardContainer.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 15 - ((14 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 15
normal! 014|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_events/usePusher.ts", ":p")) | buffer packages/ui-app/app/_events/usePusher.ts | else | edit packages/ui-app/app/_events/usePusher.ts | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_events/usePusher.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventMoveTaskToOtherBoard.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 29 - ((28 * winheight(0) + 15) / 31)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 29
normal! 03|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventSendTaskComment.ts", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventSendTaskComment.ts | else | edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventSendTaskComment.ts | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventSendTaskComment.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/BoardContainer.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 19 - ((11 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 19
normal! 03|
wincmd w
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 119 + 120) / 240)
exe '4resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 4resize ' . ((&columns * 119 + 120) / 240)
tabnext
edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventSendTaskComment.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 119 + 120) / 240)
exe '2resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 120 + 120) / 240)
exe '4resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 4resize ' . ((&columns * 120 + 120) / 240)
argglobal
balt packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 29 - ((21 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 29
normal! 025|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx | else | edit packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventSendTaskComment.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 11 - ((10 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 11
normal! 05|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/TaskComment.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/TaskComment.tsx | else | edit packages/ui-app/app/_features/TaskComments/TaskComment.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/TaskComment.tsx
endif
balt packages/ui-app/app/_features/TaskComments/context.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 35 - ((19 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 35
normal! 019|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/context.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/context.tsx | else | edit packages/ui-app/app/_features/TaskComments/context.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/context.tsx
endif
balt packages/ui-app/app/_features/TaskComments/TaskComment.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 66 - ((16 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 66
normal! 03|
wincmd w
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 119 + 120) / 240)
exe '2resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 120 + 120) / 240)
exe '4resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 4resize ' . ((&columns * 120 + 120) / 240)
tabnext
edit packages/ui-app/services/task.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
argglobal
balt packages/be-gateway/src/lib/pusher-server.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 73 - ((48 * winheight(0) + 30) / 61)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 73
normal! 013|
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/routes/comment/index.ts", ":p")) | buffer packages/be-gateway/src/routes/comment/index.ts | else | edit packages/be-gateway/src/routes/comment/index.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/routes/comment/index.ts
endif
balt packages/be-gateway/src/routes/project/status.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 63 - ((10 * winheight(0) + 30) / 61)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 63
normal! 019|
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
tabnext 3
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
