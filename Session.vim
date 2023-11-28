let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/code/tutors/mern/kampuni/activity
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
badd +58 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
badd +9 packages/ui-app/app/_features/Activity/regex.ts
badd +20 packages/ui-app/app/_features/Activity/ActivityList.tsx
badd +1 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardAttachContent.tsx
badd +0 packages/ui-app/app/_features/Automation/AutomateList.tsx
badd +42 packages/ui-app/app/_features/Activity/ActivityCardAttach.tsx
badd +143 packages/ui-app/app/[orgID]/project/[projectId]/TaskForm.tsx
badd +63 packages/ui-app/app/_features/TaskImport/TaskImportArea.tsx
badd +66 package.json
badd +35 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCommentEditor.tsx
badd +24 ~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/report/index.ts
badd +40 ~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/activity/index.ts
badd +20 packages/ui-app/app/_features/Activity/ActivityCardComment.tsx
badd +11 ~/code/tutors/mern/kampuni/activity/packages/shared-ui/src/components/Controls/index.tsx
badd +57 ~/code/tutors/mern/kampuni/activity/packages/shared-ui/src/components/Controls/TextEditorControl/index.tsx
badd +0 packages/shared-models/src/prisma/schema.prisma
badd +14 packages/ui-app/services/activity.ts
badd +9 packages/ui-app/app/_features/Activity/index.tsx
badd +35 packages/shared-models/src/lib/activity.ts
badd +79 packages/be-gateway/src/routes/member/index.ts
badd +16 packages/shared-models/src/lib/index.ts
argglobal
%argdel
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
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
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
exe 'vert 1resize ' . ((&columns * 48 + 105) / 210)
exe '2resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 2resize ' . ((&columns * 53 + 105) / 210)
exe '3resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 3resize ' . ((&columns * 53 + 105) / 210)
exe '4resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 4resize ' . ((&columns * 107 + 105) / 210)
exe '5resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 5resize ' . ((&columns * 53 + 105) / 210)
exe '6resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 6resize ' . ((&columns * 53 + 105) / 210)
argglobal
enew
file NvimTree_1
balt packages/ui-app/app/_features/Activity/regex.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
wincmd w
argglobal
balt packages/ui-app/app/_features/Activity/ActivityCardAttach.tsx
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
let s:l = 60 - ((9 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 60
normal! 07|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityList.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityList.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityList.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityList.tsx
endif
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
let s:l = 16 - ((11 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 16
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx", ":p")) | buffer ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx | else | edit ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx | endif
if &buftype ==# 'terminal'
  silent file ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
endif
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
let s:l = 54 - ((12 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 54
normal! 03|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/index.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/index.tsx | else | edit packages/ui-app/app/_features/Activity/index.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/index.tsx
endif
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
let s:l = 8 - ((7 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 8
normal! 06|
wincmd w
argglobal
if bufexists(fnamemodify("~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCommentEditor.tsx", ":p")) | buffer ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCommentEditor.tsx | else | edit ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCommentEditor.tsx | endif
if &buftype ==# 'terminal'
  silent file ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCommentEditor.tsx
endif
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
let s:l = 29 - ((11 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 29
normal! 019|
wincmd w
exe 'vert 1resize ' . ((&columns * 48 + 105) / 210)
exe '2resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 2resize ' . ((&columns * 53 + 105) / 210)
exe '3resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 3resize ' . ((&columns * 53 + 105) / 210)
exe '4resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 4resize ' . ((&columns * 107 + 105) / 210)
exe '5resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 5resize ' . ((&columns * 53 + 105) / 210)
exe '6resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 6resize ' . ((&columns * 53 + 105) / 210)
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
exe 'vert 1resize ' . ((&columns * 70 + 105) / 210)
exe '2resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 2resize ' . ((&columns * 69 + 105) / 210)
exe '3resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 3resize ' . ((&columns * 69 + 105) / 210)
exe '4resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 4resize ' . ((&columns * 139 + 105) / 210)
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
let s:l = 16 - ((14 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 16
normal! 06|
wincmd w
argglobal
if bufexists(fnamemodify("~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/activity/index.ts", ":p")) | buffer ~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/activity/index.ts | else | edit ~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/activity/index.ts | endif
if &buftype ==# 'terminal'
  silent file ~/code/tutors/mern/kampuni/activity/packages/be-gateway/src/routes/activity/index.ts
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
let s:l = 47 - ((10 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 47
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
let s:l = 88 - ((10 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 88
normal! 06|
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
let s:l = 40 - ((18 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 40
normal! 0
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 70 + 105) / 210)
exe '2resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 2resize ' . ((&columns * 69 + 105) / 210)
exe '3resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 3resize ' . ((&columns * 69 + 105) / 210)
exe '4resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 4resize ' . ((&columns * 139 + 105) / 210)
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
let s:l = 314 - ((37 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 314
normal! 028|
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
let s:l = 3 - ((2 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 3
normal! 08|
tabnext 2
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
