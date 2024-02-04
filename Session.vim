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
badd +24 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskComment.tsx
badd +2 /mnt/Data/code/fullstack/kampuni-area/comments/packages/shared-ui/src/components/Controls/index.tsx
badd +4 packages/shared-ui/src/components/Controls/TextareaControl/index.tsx
badd +1 packages/shared-models/src/prisma/schema.prisma
badd +2 packages/shared-models/src/lib/activity.ts
badd +42 packages/shared-models/src/lib/message.ts
badd +23 packages/shared-models/src/lib/_prisma.ts
badd +3 packages/be-gateway/src/lib/pusher-server.ts
badd +8 packages/ui-app/app/_components/PushNotification/index.tsx
badd +1 packages/shared-libs/src/lib/pusher-client.ts
badd +4 packages/ui-app/app/_events/usePusher.ts
badd +1 .env
badd +25 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventMoveTaskToOtherBoard.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/useBoardRealtimeUpdate.ts
badd +18 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/index.tsx
badd +15 packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx
badd +4 packages/ui-app/services/activity.ts
badd +1 packages/ui-app/services/message.ts
badd +66 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskDetail/index.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
badd +13 packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx
badd +6 packages/ui-app/app/_features/Activity/context.tsx
badd +241 packages/be-gateway/src/services/activity.service.ts
badd +7 packages/be-gateway/src/services/project.ts
badd +17 packages/be-gateway/src/main.ts
badd +10 packages/be-gateway/src/routes/activity/index.ts
badd +2 packages/shared-models/src/index.ts
badd +4 packages/shared-models/src/type.ts
badd +21 packages/shared-models/src/lib/index.ts
badd +9 packages/ui-app/app/_features/TaskComments/context.tsx
badd +17 packages/be-gateway/src/routes/index.ts
badd +22 packages/be-gateway/src/routes/comment/index.ts
badd +1 packages/ui-app/services/comment.ts
badd +15 packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/useBoardRealtimeUpdate.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
3wincmd k
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
wincmd w
wincmd w
wincmd w
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
exe '1resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 80 + 120) / 240)
exe '2resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 79 + 120) / 240)
exe '3resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe '4resize ' . ((&lines * 15 + 32) / 65)
exe '5resize ' . ((&lines * 15 + 32) / 65)
exe '6resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 6resize ' . ((&columns * 120 + 120) / 240)
exe '7resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 7resize ' . ((&columns * 119 + 120) / 240)
argglobal
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
let s:l = 41 - ((7 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 41
normal! 03|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventMoveTaskToOtherBoard.ts", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventMoveTaskToOtherBoard.ts | else | edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventMoveTaskToOtherBoard.ts | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_events/useEventMoveTaskToOtherBoard.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/board/useBoardRealtimeUpdate.ts
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
let s:l = 18 - ((6 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 18
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
let s:l = 4 - ((3 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 4
normal! 014|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_components/PushNotification/index.tsx", ":p")) | buffer packages/ui-app/app/_components/PushNotification/index.tsx | else | edit packages/ui-app/app/_components/PushNotification/index.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_components/PushNotification/index.tsx
endif
balt packages/ui-app/app/_events/usePusher.ts
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
let s:l = 13 - ((6 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 13
normal! 07|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-libs/src/lib/pusher-client.ts", ":p")) | buffer packages/shared-libs/src/lib/pusher-client.ts | else | edit packages/shared-libs/src/lib/pusher-client.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-libs/src/lib/pusher-client.ts
endif
balt packages/ui-app/app/_components/PushNotification/index.tsx
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
let s:l = 8 - ((7 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 8
normal! 026|
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/lib/pusher-server.ts", ":p")) | buffer packages/be-gateway/src/lib/pusher-server.ts | else | edit packages/be-gateway/src/lib/pusher-server.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/lib/pusher-server.ts
endif
balt packages/shared-libs/src/lib/pusher-client.ts
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
let s:l = 7 - ((6 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 7
normal! 024|
wincmd w
argglobal
if bufexists(fnamemodify(".env", ":p")) | buffer .env | else | edit .env | endif
if &buftype ==# 'terminal'
  silent file .env
endif
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
let s:l = 2 - ((1 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 2
normal! 0
wincmd w
exe '1resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 80 + 120) / 240)
exe '2resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 79 + 120) / 240)
exe '3resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe '4resize ' . ((&lines * 15 + 32) / 65)
exe '5resize ' . ((&lines * 15 + 32) / 65)
exe '6resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 6resize ' . ((&columns * 120 + 120) / 240)
exe '7resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 7resize ' . ((&columns * 119 + 120) / 240)
tabnext
edit packages/ui-app/services/comment.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
3wincmd h
wincmd w
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
exe '1resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
exe '3resize ' . ((&lines * 46 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 59 + 120) / 240)
exe '4resize ' . ((&lines * 46 + 32) / 65)
exe 'vert 4resize ' . ((&columns * 59 + 120) / 240)
exe '5resize ' . ((&lines * 46 + 32) / 65)
exe 'vert 5resize ' . ((&columns * 60 + 120) / 240)
exe '6resize ' . ((&lines * 22 + 32) / 65)
exe 'vert 6resize ' . ((&columns * 59 + 120) / 240)
exe '7resize ' . ((&lines * 23 + 32) / 65)
exe 'vert 7resize ' . ((&columns * 59 + 120) / 240)
argglobal
balt packages/ui-app/services/message.ts
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
let s:l = 18 - ((6 * winheight(0) + 7) / 14)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 18
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-ui/src/components/Controls/TextareaControl/index.tsx", ":p")) | buffer packages/shared-ui/src/components/Controls/TextareaControl/index.tsx | else | edit packages/shared-ui/src/components/Controls/TextareaControl/index.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/shared-ui/src/components/Controls/TextareaControl/index.tsx
endif
balt packages/ui-app/services/activity.ts
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
let s:l = 11 - ((6 * winheight(0) + 7) / 14)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 11
normal! 03|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx | else | edit packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskComment.tsx
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
let s:l = 12 - ((11 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 12
normal! 019|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/index.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/index.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/index.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/index.tsx
endif
balt packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx
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
let s:l = 17 - ((16 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 17
normal! 028|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx | else | edit packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx
endif
balt packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx
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
let s:l = 14 - ((13 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 14
normal! 022|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskComment.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskComment.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskComment.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskComment.tsx
endif
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
let s:l = 29 - ((9 * winheight(0) + 10) / 21)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 29
normal! 014|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx | else | edit packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskComment.tsx
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
let s:l = 17 - ((16 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 17
normal! 018|
wincmd w
6wincmd w
exe '1resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 15 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
exe '3resize ' . ((&lines * 46 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 59 + 120) / 240)
exe '4resize ' . ((&lines * 46 + 32) / 65)
exe 'vert 4resize ' . ((&columns * 59 + 120) / 240)
exe '5resize ' . ((&lines * 46 + 32) / 65)
exe 'vert 5resize ' . ((&columns * 60 + 120) / 240)
exe '6resize ' . ((&lines * 22 + 32) / 65)
exe 'vert 6resize ' . ((&columns * 59 + 120) / 240)
exe '7resize ' . ((&lines * 23 + 32) / 65)
exe 'vert 7resize ' . ((&columns * 59 + 120) / 240)
tabnext
edit packages/ui-app/app/_features/Activity/context.tsx
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
balt packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx
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
let s:l = 29 - ((11 * winheight(0) + 30) / 61)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 29
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/context.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/context.tsx | else | edit packages/ui-app/app/_features/TaskComments/context.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/context.tsx
endif
balt packages/ui-app/app/_features/Activity/context.tsx
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
let s:l = 9 - ((8 * winheight(0) + 30) / 61)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 9
normal! 010|
wincmd w
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
tabnext
edit packages/shared-models/src/prisma/schema.prisma
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
balt packages/shared-ui/src/components/Controls/TextareaControl/index.tsx
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
let s:l = 417 - ((28 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 417
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/routes/index.ts", ":p")) | buffer packages/be-gateway/src/routes/index.ts | else | edit packages/be-gateway/src/routes/index.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/routes/index.ts
endif
balt packages/be-gateway/src/routes/comment/index.ts
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
let s:l = 17 - ((14 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 17
normal! 08|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/lib/message.ts", ":p")) | buffer packages/shared-models/src/lib/message.ts | else | edit packages/shared-models/src/lib/message.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/lib/message.ts
endif
balt packages/shared-models/src/lib/activity.ts
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
let s:l = 47 - ((29 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 47
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/lib/_prisma.ts", ":p")) | buffer packages/shared-models/src/lib/_prisma.ts | else | edit packages/shared-models/src/lib/_prisma.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/lib/_prisma.ts
endif
balt packages/shared-models/src/lib/message.ts
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
let s:l = 23 - ((22 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 23
normal! 027|
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
edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
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
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskDetail/index.tsx
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
let s:l = 84 - ((50 * winheight(0) + 31) / 63)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 84
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskDetail/index.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskDetail/index.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskDetail/index.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskDetail/index.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
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
let s:l = 66 - ((14 * winheight(0) + 31) / 63)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 66
normal! 025|
wincmd w
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
tabnext 2
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
