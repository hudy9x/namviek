let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /mnt/Data/code/fullstack/kampuni-area/activity@v1
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +1 packages/shared-models/src/prisma/schema.prisma
badd +41 ./packages//ui-app//app//_features//Activity//ActivityCardAttach.tsx
badd +63 ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx
badd +24 ./packages//ui-app//app//_features//Activity//ActivityCommentEditor.tsx
badd +18 ./packages//ui-app//app//_features//Activity//ActivityCreatorAvatar.tsx
badd +9 ./packages//ui-app//app//_features//Activity//ActivityMemberRepresent.tsx
badd +135 ./packages//ui-app//app//_features//Activity//context.tsx
badd +30 packages/shared-models/src/type.ts
badd +1 packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/activity/index.ts
badd +16 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/example/index.ts
badd +29 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/main.ts
badd +44 packages/be-gateway/src/routes/test2.ts
badd +7 packages/be-gateway/src/core/index.ts
badd +9 packages/be-gateway/src/core/Controller.ts
badd +15 packages/be-gateway/src/core/methods/Get.ts
badd +23 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/index.ts
badd +17 packages/ui-app/services/activity.ts
badd +14 packages/be-gateway/src/core/Mapper.ts
badd +2 packages/shared-ui/src/components/Controls/TextEditorControl/index.tsx
badd +1 .env
badd +3 packages/be-gateway/src/lib/jwt.ts
badd +1 packages/be-gateway/src/routes/auth/index.ts
badd +36 packages/goalie-nextjs/src/services/auth.ts
badd +8 packages/ui-app/app/_features/Activity/index.tsx
badd +12 packages/ui-app/app/_features/Activity/ActivityContainer.tsx
badd +3 packages/shared-ui/src/components/Controls/ListControl/ListOptions.tsx
badd +120 packages/shared-ui/src/components/Controls/ListControl/index.tsx
badd +1 packages/ui-app/app/_components/PointSelect.tsx
badd +44 packages/shared-ui/src/components/Controls/type.ts
badd +29 packages/ui-app/app/_features/Activity/ActivityList.tsx
badd +1 packages/ui-app/app/_components/EmojiInput/index.tsx
badd +55 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/core/AppRoutes.ts
badd +49 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskForm.tsx
badd +75 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/services/task.ts
badd +592 packages/be-gateway/src/routes/task/index.ts
badd +1 package.json
badd +2 packages/shared-models/src/index.ts
badd +11 packages/shared-models/src/lib/activity.ts
badd +12 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/shared-ui/src/components/Controls/index.tsx
badd +96 packages/ui-app/app/_components/StatusSelectMultiple.tsx
badd +121 packages/ui-app/app/_components/ProjectSelectMultiple.tsx
badd +25 packages/ui-app/app/_features/Activity/ActivityLog.tsx
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit packages/shared-models/src/prisma/schema.prisma
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
balt ./packages//ui-app//app//_features//Activity//context.tsx
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
let s:l = 322 - ((51 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 322
normal! 023|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/type.ts", ":p")) | buffer packages/shared-models/src/type.ts | else | edit packages/shared-models/src/type.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/type.ts
endif
balt packages/shared-models/src/prisma/schema.prisma
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
let s:l = 30 - ((29 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 30
normal! 019|
wincmd w
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
tabnext
edit packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
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
exe 'vert 1resize ' . ((&columns * 79 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 80 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe '4resize ' . ((&lines * 28 + 30) / 60)
argglobal
balt packages/ui-app/app/_features/Activity/index.tsx
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
let s:l = 48 - ((24 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 48
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("./packages//ui-app//app//_features//Activity//ActivityCardAttach.tsx", ":p")) | buffer ./packages//ui-app//app//_features//Activity//ActivityCardAttach.tsx | else | edit ./packages//ui-app//app//_features//Activity//ActivityCardAttach.tsx | endif
if &buftype ==# 'terminal'
  silent file ./packages//ui-app//app//_features//Activity//ActivityCardAttach.tsx
endif
balt ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx
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
let s:l = 46 - ((18 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 46
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityList.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityList.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityList.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityList.tsx
endif
balt packages/ui-app/app/_features/Activity/ActivityContainer.tsx
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
let s:l = 31 - ((16 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 31
normal! 05|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityLog.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityLog.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityLog.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityLog.tsx
endif
balt ./packages//ui-app//app//_features//Activity//context.tsx
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
let s:l = 77 - ((13 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 77
normal! 0
wincmd w
4wincmd w
exe '1resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 1resize ' . ((&columns * 79 + 120) / 240)
exe '2resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 80 + 120) / 240)
exe '3resize ' . ((&lines * 28 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 79 + 120) / 240)
exe '4resize ' . ((&lines * 28 + 30) / 60)
tabnext
edit /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/services/task.ts
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
balt /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
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
let s:l = 55 - ((45 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 55
normal! 014|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/app/\[orgID]/project/\[projectId]/TaskUpdate.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/services/task.ts
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
let s:l = 98 - ((44 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 98
normal! 05|
wincmd w
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
tabnext
edit /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/activity/index.ts
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
exe '1resize ' . ((&lines * 29 + 30) / 60)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 29 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
exe '3resize ' . ((&lines * 27 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 119 + 120) / 240)
exe '4resize ' . ((&lines * 27 + 30) / 60)
exe 'vert 4resize ' . ((&columns * 120 + 120) / 240)
argglobal
balt /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/index.ts
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
let s:l = 80 - ((21 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 80
normal! 018|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/services/activity.ts", ":p")) | buffer packages/ui-app/services/activity.ts | else | edit packages/ui-app/services/activity.ts | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/services/activity.ts
endif
balt /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/activity/index.ts
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
let s:l = 26 - ((14 * winheight(0) + 14) / 28)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 26
normal! 046|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/lib/activity.ts", ":p")) | buffer packages/shared-models/src/lib/activity.ts | else | edit packages/shared-models/src/lib/activity.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/lib/activity.ts
endif
balt packages/be-gateway/src/routes/test2.ts
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
let s:l = 12 - ((11 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 12
normal! 08|
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/routes/task/index.ts", ":p")) | buffer packages/be-gateway/src/routes/task/index.ts | else | edit packages/be-gateway/src/routes/task/index.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/routes/task/index.ts
endif
balt packages/be-gateway/src/core/methods/Get.ts
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
let s:l = 506 - ((12 * winheight(0) + 13) / 26)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 506
normal! 013|
wincmd w
exe '1resize ' . ((&lines * 29 + 30) / 60)
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe '2resize ' . ((&lines * 29 + 30) / 60)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
exe '3resize ' . ((&lines * 27 + 30) / 60)
exe 'vert 3resize ' . ((&columns * 119 + 120) / 240)
exe '4resize ' . ((&lines * 27 + 30) / 60)
exe 'vert 4resize ' . ((&columns * 120 + 120) / 240)
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
