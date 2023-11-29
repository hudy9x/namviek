let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /mnt/Data/code/fullstack/kampuni-area/activity
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +8 packages/ui-app/app/_features/Activity/ActivityCardCommentMention.tsx
badd +1 packages/ui-app/app/_features/Activity/ActivityCardCommentLink.tsx
badd +1 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
badd +9 packages/ui-app/app/_features/Activity/regex.ts
badd +39 packages/ui-app/app/_features/Activity/ActivityList.tsx
badd +1 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardAttachContent.tsx
badd +1 packages/ui-app/app/_features/Automation/AutomateList.tsx
badd +63 packages/ui-app/app/_features/TaskImport/TaskImportArea.tsx
badd +66 package.json
badd +1 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCommentEditor.tsx
badd +24 ~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/report/index.ts
badd +1 ~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/activity/index.ts
badd +11 ~/code/tutors/mern/kampuni/activity/packages/shared-ui/src/components/Controls/index.tsx
badd +57 ~/code/tutors/mern/kampuni/activity/packages/shared-ui/src/components/Controls/TextEditorControl/index.tsx
badd +1 packages/shared-models/src/prisma/schema.prisma
badd +1 packages/ui-app/services/activity.ts
badd +8 packages/ui-app/app/_features/Activity/index.tsx
badd +36 packages/shared-models/src/lib/activity.ts
badd +86 packages/be-gateway/src/routes/member/index.ts
badd +16 packages/shared-models/src/lib/index.ts
badd +1 NvimTree_1
badd +60 packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
badd +23 packages/ui-app/app/_features/Activity/ActivityCommentEditor.tsx
badd +27 packages/be-gateway/src/routes/activity/index.ts
badd +1 packages/ui-app/app/\[orgID]/meeting/MeetingContainer.tsx
badd +1 packages/ui-app/app/\[orgID]/meeting/MeetingRoomList.tsx
badd +31 packages/ui-app/app/_features/TaskImport/context.ts
badd +95 packages/ui-app/app/_features/Automation/context.tsx
badd +68 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/context.tsx
badd +29 packages/ui-app/app/_features/Automation/index.tsx
badd +69 packages/ui-app/app/_features/Project/Vision/context.tsx
badd +126 packages/ui-app/app/_features/Project/Vision/index.tsx
badd +9 packages/ui-app/app/_features/Activity/ActivityTimeLog.tsx
badd +47 packages/ui-app/app/_features/Activity/ActivityCardAttach.tsx
badd +33 packages/ui-app/app/_features/Activity/ActivityCardComment.tsx
badd +12 packages/ui-app/app/_features/Activity/ActivityContainer.tsx
badd +49 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskForm.tsx
badd +57 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
badd +55 /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/services/task.ts
badd +1 packages/be-gateway/src/routes/task/index.ts
badd +7 packages/ui-app/app/_features/Activity/ActivityCardCommentReaction.tsx
badd +8 packages/shared-ui/src/components/Popover/index.tsx
badd +21 packages/ui-app/app/\[orgID]/project/\[projectId]/settings/status/ItemStatus.tsx
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit packages/ui-app/app/_features/Activity/ActivityList.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
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
exe '1resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 1resize ' . ((&columns * 79 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 79 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 80 + 120) / 240)
exe '4resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 4resize ' . ((&columns * 80 + 120) / 240)
exe 'vert 5resize ' . ((&columns * 79 + 120) / 240)
argglobal
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
let s:l = 37 - ((17 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 37
normal! 08|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityTimeLog.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityTimeLog.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityTimeLog.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityTimeLog.tsx
endif
balt packages/ui-app/app/_features/Activity/ActivityList.tsx
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
let s:l = 7 - ((6 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 7
normal! 017|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityCardComment.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityCardComment.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityCardComment.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityCardComment.tsx
endif
balt packages/ui-app/app/_features/Activity/ActivityCardCommentReaction.tsx
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
let s:l = 33 - ((20 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 33
normal! 050|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityCardCommentReaction.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityCardCommentReaction.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityCardCommentReaction.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityCardCommentReaction.tsx
endif
balt packages/ui-app/app/_features/Activity/ActivityCardComment.tsx
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
let s:l = 17 - ((16 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 17
normal! 011|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/context.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/context.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/context.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/_features/Activity/context.tsx
endif
balt packages/ui-app/app/_features/Activity/ActivityCommentEditor.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
98,130fold
let &fdl = &fdl
let s:l = 68 - ((30 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 68
normal! 047|
wincmd w
5wincmd w
exe '1resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 1resize ' . ((&columns * 79 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 79 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 80 + 120) / 240)
exe '4resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 4resize ' . ((&columns * 80 + 120) / 240)
exe 'vert 5resize ' . ((&columns * 79 + 120) / 240)
tabnext
edit packages/ui-app/app/\[orgID]/project/\[projectId]/settings/status/ItemStatus.tsx
argglobal
balt packages/ui-app/app/_features/Activity/ActivityCardCommentReaction.tsx
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
let s:l = 160 - ((44 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 160
normal! 010|
tabnext
edit packages/be-gateway/src/routes/task/index.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd w
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
exe '1resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 1resize ' . ((&columns * 80 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 79 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 160 + 120) / 240)
exe 'vert 4resize ' . ((&columns * 79 + 120) / 240)
argglobal
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/services/task.ts
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
let s:l = 479 - ((11 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 479
normal! 026|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/services/task.ts", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/services/task.ts | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/services/task.ts | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/services/task.ts
endif
balt packages/be-gateway/src/routes/task/index.ts
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
let s:l = 55 - ((15 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 55
normal! 024|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/services/task.ts
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
let s:l = 57 - ((21 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 57
normal! 09|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskForm.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskForm.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskForm.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskForm.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
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
let s:l = 49 - ((10 * winheight(0) + 28) / 57)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 49
normal! 025|
wincmd w
exe '1resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 1resize ' . ((&columns * 80 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 79 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 160 + 120) / 240)
exe 'vert 4resize ' . ((&columns * 79 + 120) / 240)
tabnext
edit packages/ui-app/services/activity.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
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
exe 'vert 1resize ' . ((&columns * 79 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 80 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe '4resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 4resize ' . ((&columns * 160 + 120) / 240)
argglobal
balt ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCommentEditor.tsx
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
let s:l = 18 - ((17 * winheight(0) + 28) / 57)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 18
normal! 016|
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/routes/member/index.ts", ":p")) | buffer packages/be-gateway/src/routes/member/index.ts | else | edit packages/be-gateway/src/routes/member/index.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/routes/member/index.ts
endif
balt ~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/activity/index.ts
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
let s:l = 94 - ((11 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 94
normal! 020|
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/routes/activity/index.ts", ":p")) | buffer packages/be-gateway/src/routes/activity/index.ts | else | edit packages/be-gateway/src/routes/activity/index.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/routes/activity/index.ts
endif
balt packages/be-gateway/src/routes/member/index.ts
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
let s:l = 27 - ((17 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 27
normal! 027|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/lib/activity.ts", ":p")) | buffer packages/shared-models/src/lib/activity.ts | else | edit packages/shared-models/src/lib/activity.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/lib/activity.ts
endif
balt ~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/activity/index.ts
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
let s:l = 6 - ((5 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 6
normal! 0
wincmd w
exe 'vert 1resize ' . ((&columns * 79 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 80 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe '4resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 4resize ' . ((&columns * 160 + 120) / 240)
tabnext
edit packages/shared-models/src/prisma/schema.prisma
argglobal
balt ~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/activity/index.ts
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
let s:l = 309 - ((40 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 309
normal! 0
tabnext
edit packages/ui-app/app/_features/Automation/AutomateList.tsx
argglobal
balt packages/ui-app/app/_features/Activity/ActivityCardCommentLink.tsx
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
let s:l = 3 - ((2 * winheight(0) + 28) / 57)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 3
normal! 08|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
